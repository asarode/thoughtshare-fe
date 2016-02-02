import I from 'immutable'
import qs from 'query-string'
import request from 'superagent-bluebird-promise'
import { createReducer } from '../../utils'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST_NOTES'
const FETCH_LIST_DONE = 'FETCH_LIST_DONE_NOTES'

const initState = I.fromJS({
  docs: {},
  error: [],
  isLoadingList: false
})
const notes = createReducer(initState, {
  [FETCH_LIST_REQUEST](state, action) {
    return state.merge({
      error: [],
      isLoadingList: false
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
    }).mergeDeepIn(['docs'], payload)
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

export default notes
