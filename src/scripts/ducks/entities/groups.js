import I from 'immutable'
import qs from 'query-string'
import request from 'superagent-bluebird-promise'
import { createReducer } from '../../utils'
import { noteActs, groupActs } from '.'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST_GROUPS'
const FETCH_LIST_DONE = 'FETCH_LIST_DONE_GROUPS'
const FETCH_ONE_REQUEST = 'FETCH_ONE_REQUEST_GROUPS'
const FETCH_ONE_DONE = 'FETCH_ONE_DONE_GROUPS'
const DIRTY_ONE = 'DIRTY_ONE_GROUP'

const initState = I.fromJS({
  docs: {},
  error: [],
  meta: {},
  isLoading: false,
  isLoadingList: false
})
const groups = createReducer(initState, {
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
      isLoadingList: false,
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
    return state.mergeDeep({
      isLoading: false,
    })
    .setIn(['docs', payload.id], I.fromJS(payload))
    .setIn(['meta', payload.id, 'fullyLoaded'], true)
  },
  [DIRTY_ONE](state, action) {
    const { payload } = action
    return state.setIn(['meta', payload.id, 'fullyLoaded'], false)
  }
})

export const fetchList = (input, limit=10, skip=0) => dispatch => {
  dispatch(fetchListRequest())
  const filter = qs.stringify({ limit, skip })
  let url = input.includes('/api')
    ? `http://localhost:4000${input}`
    : `http://localhost:4000/api/v2/groups/${input}/groups`
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
      dispatch(fetchList(res.body.links.groups))
      dispatch(noteActs.fetchList(res.body.links.notes))
      dispatch(fetchOneDone(null, res.body))
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
    parent: body.data.relationships.parent.data
      ? { id: body.data.relationships.parent.data.id }
      : null
  }
  return {
    type: FETCH_ONE_DONE,
    payload: flattenedData
  }
}

export const dirtyOne = id => ({
  type: DIRTY_ONE,
  payload: { id }
})

export default groups
