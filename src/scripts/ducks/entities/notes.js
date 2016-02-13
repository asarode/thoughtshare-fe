import I from 'immutable'
import qs from 'query-string'
import request from 'superagent-bluebird-promise'
import { createReducer } from '../../utils'
import { groupActs } from '.'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST_NOTES'
const FETCH_LIST_DONE = 'FETCH_LIST_DONE_NOTES'
const CREATE_REQUEST = 'CREATE_REQUEST_NOTES'
const CREATE_DONE = 'CREATE_DONE_NOTES'

const initState = I.fromJS({
  docs: {},
  error: [],
  meta: {},
  isLoadingList: false,
  isLoadingCreate: false
})
const notes = createReducer(initState, {
  [FETCH_LIST_REQUEST](state, action) {
    return state.merge({
      error: [],
      isLoadingList: true
    })
  },
  [FETCH_LIST_DONE](state, action) {
    const { payload, error } = action
    if (error) {
      return state.merge({
        error: payload,
        isLoadingList: false
      })
    }
    return state.merge({
      isLoadingList: false
    })
    .mergeDeepIn(['docs'], payload.docs)
    .mergeDeepIn(['meta'], payload.meta)
  },
  [CREATE_REQUEST](state, action) {
    return state.merge({
      error: [],
      isLoadingCreate: true
    })
  },
  [CREATE_DONE](state, action) {
    const { payload, error } = action
    if (error) {
      return state.merge({
        error: payload,
        isLoadingCreate: false
      })
    }
    return state.merge({
      isLoadingCreate: false
    })
    .setIn(['docs', payload.id], payload)
    .setIn(['meta', payload.id, 'fullyLoaded'], false)
  }
})

export const fetchList = (input, limit=10, skip=0) => dispatch => {
  dispatch(fetchListRequest())
  const filter = qs.stringify({ limit, skip })
  const url = input.includes('/api')
    ? `http://localhost:4000${input}`
    : `http://localhost:4000/api/v2/groups/${input}/notes`
  request
    .get(url)
    .then(res => {
      dispatch(fetchListDone(null, res.body))
    })
    .error(err => {
      console.error(err)
      dispatch(fetchListDone(err.body))
    })
}

const fetchListRequest = () => ({
  type: FETCH_LIST_REQUEST
})

const fetchListDone = (err, body) => {
  if (err) {
    return {
      type: FETCH_LIST_DONE,
      payload: err.errors,
      error: true
    }
  }

  const docs = body.data.map(item => {
    return {
      id: item.id,
      ...item.attributes,
      creator: {
        id: item.relationships.creator.data.id,
        ...item.relationships.creator.data.attributes
      }
    }
  }).reduce((prev, curr) => {
    prev[curr.id] = curr
    return prev
  }, {})

  const meta = body.data.map(item => {
    return { id: item.id }
  }).reduce((prev, curr) => {
    prev[curr.id] = {
      'fullyLoaded': true
    }
    return prev
  }, {})

  return {
    type: FETCH_LIST_DONE,
    payload: { docs, meta }
  }
}

export const create = ({ token, groupId, link, description }) => dispatch => {
  dispatch(createRequest())
  request
    .post(`http://localhost:4000/api/v2/groups/${groupId}/notes`)
    .type('application/json')
    .set('Authorization', token)
    .send({
      link,
      desc: description
    })
    .then(res => {
      dispatch(groupActs.dirtyOne(groupId))
      dispatch(groupActs.fetchOne(groupId))
      dispatch(createDone(null, res.body))
    })
    .error(err => {
      console.error(err.body)
      dispatch(createDone(err.body))
    })
}

const createRequest = () => ({
  type: CREATE_REQUEST
})

const createDone = (err, body) => {
  if (err) {
    return {
      type: CREATE_DONE,
      payload: err.errors,
      error: true
    }
  }

  const flattenedData = {
    id: body.data.id
  }
  return {
    type: CREATE_DONE,
    payload: flattenedData
  }
}

export default notes
