import I from 'immutable'
import qs from 'query-string'
import request from 'superagent-bluebird-promise'
import { createReducer } from '../../utils'
import { noteActs, groupActs } from '.'

const FETCH_LIST_REQUEST = 'FETCH_REQUEST_THOUGHTS'
const FETCH_LIST_DONE = 'FETCH_LIST_DONE_THOUGHTS'
const FETCH_ONE_REQUEST = 'FETCH_ONE_REQUEST_THOUGHTS'
const FETCH_ONE_DONE = 'FETCH_ONE_DONE_THOUGHTS'
const CREATE_REQUEST = 'CREATE_REQUEST_THOUGHTS'
const CREATE_DONE = 'CREATE_DONE_THOUGHTS'


const initState = I.fromJS({
  docs: {},
  error: [],
  isLoading: false
})
const thoughts = createReducer(initState, {
  [FETCH_LIST_REQUEST](state, action) {
    return state.merge({
      error: [],
      isLoading: true
    })
  },
  [FETCH_LIST_DONE](state, action) {
    const { payload, error } = action
    if (error) {
      return state.merge({
        error: payload,
        isLoading: false
      })
    }
    return state.merge({
      isLoading: false
    }).mergeDeepIn(['docs'], payload)
  },
  [FETCH_ONE_REQUEST](state, action) {
    return state.merge({
      error: [],
      isLoading: true
    })
  },
  [FETCH_ONE_DONE](state, action) {
    const { payload, error } = action
    if (error) {
      return state.merge({
        error: payload,
        isLoading: false
      })
    }
    return state.merge({
      isLoading: false
    }).setIn(['docs', payload.id], payload)
  },
  [CREATE_REQUEST](state, action) {
    return state.merge({
      error: [],
      isLoading: true
    })
  },
  [CREATE_DONE](state, action) {
    const { payload, error } = action
    if (error) {
      return state.merge({
        error: payload,
        isLoading: false
      })
    }
    return state.merge({
      isLoading: false
    }).setIn(['docs', payload.id], payload)
  }
})

export const fetchList = (limit=10, skip=0) => dispatch => {
  dispatch(fetchListRequest())
  const filter = qs.stringify({ limit, skip })
  request
    .get(`http://localhost:4000/api/v2/thoughts?${filter}`)
    .then(res => {
      dispatch(fetchListDone(null, res.body))
    })
    .error(err => {
      console.error(err)
      dispatch(fetchListDone(err.body))
    })
}

const fetchListRequest = () => ({
  type: FETCH_LIST_REQUEST,
  payload: null
})

const fetchListDone = (err, body) => {
  if (err) {
    return {
      type: FETCH_LIST_DONE,
      payload: err.errors,
      error: true
    }
  }
  const flattenedData = body.data.map(item => {
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
  return {
    type: FETCH_LIST_DONE,
    payload: flattenedData
  }
}

export const fetchOne = id => dispatch => {
  dispatch(fetchOneRequest())
  request
    .get(`http://localhost:4000/api/v2/groups/${id}`)
    .then(res => {
      dispatch(fetchOneDone(null, res.body))
      dispatch(groupActs.fetchList(res.body.links.groups))
      dispatch(noteActs.fetchList(res.body.links.notes))
    })
    .error(err => {
      console.error(err)
      dispatch(fetchOneDone(err.body))
    })
}

const fetchOneRequest = () => ({
  type: FETCH_ONE_REQUEST,
  payload: null
})

const fetchOneDone = (err, body) => {
  if (err) {
    return {
      type: FETCH_ONE_DONE,
      payload: err.errors,
      error: true
    }
  }

  const flattenedData = {
    id: body.data.id,
    ...body.data.attributes,
    creator: {
      id: body.data.relationships.creator.data.id,
      ...body.data.relationships.creator.data.attributes
    },
    groups: body.data.relationships.groups.data.map(group => group.id),
    notes: body.data.relationships.notes.data.map(notes => notes.id),
    parentLink: body.links.parent || null
  }
  return {
    type: FETCH_ONE_DONE,
    payload: flattenedData
  }
}

export const create = ({ token, title, description }) => dispatch => {
  dispatch(createRequest())
  request
    .post(`http://localhost:4000/api/v2/thoughts`)
    .type('application/json')
    .set('Authorization', token)
    .send({
      title,
      desc: description
    })
    .then(res => {
      dispatch(createDone(null, res.body))
    })
    .error(err => {
      console.error(err.body)
      dispatch(createDone(err.body))
    })
}

const createRequest = () => ({
  type: CREATE_REQUEST,
  payload: null
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

export default thoughts
