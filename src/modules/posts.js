import request from 'superagent-bluebird-promise'
import jwt from 'jsonwebtoken'

const FETCH_POSTS_REQUEST = 'thoughtshare-fe/posts/FETCH_POSTS_REQUEST'
const FETCH_POSTS_SUCCESS = 'thoughtshare-fe/posts/FETCH_POSTS_SUCCESS'
const FETCH_POSTS_FAIL = 'thoughtshare-fe/posts/FETCH_POSTS_FAIL'
const FETCH_ONE_POST_REQUEST = 'thoughtshare-fe/posts/FETCH_ONE_POST_REQUEST'
const FETCH_ONE_POST_SUCCESS = 'thoughtshare-fe/posts/FETCH_ONE_POST_SUCCESS'
const FETCH_ONE_POST_FAIL = 'thoughtshare-fe/posts/FETCH_ONE_POST_FAIL'
const FETCH_REPLIES_REQUEST = 'thoughtshare-fe/posts/FETCH_REPLIES_REQUEST'
const FETCH_REPLIES_SUCCESS= 'thoughtshare-fe/posts/FETCH_REPLIES_SUCCESS'
const FETCH_REPLIES_FAIL = 'thoughtshare-fe/posts/FETCH_REPLIES_FAIL'

const initialState = {
  isLoading: false,
  entities: {
    posts: {},
    users: {},
    replies: {}
  },
  // posts: {
  //   [id]: {
  //     id,
  //     title,
  //     desc,
  //     createdBy: id,
  //     replies: [id]
  //   }
  // },
  // users: {
  //   [id]: {
  //     id,
  //     username
  //   }
  // }
  // {
  //   replies: {
  //     [id]: {
  //       title,
  //       link,
  //       desc,
  //       createdAt,
  //       createdBy: id
  //     }
  //   }
  // }
  results: [],
  error: null
}

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        entities: {
          posts: payload.posts,
          users: payload.users
        },
        results: payload.results,
        error: null,
        isLoading: false
      }
    case FETCH_POSTS_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false
      }
    case FETCH_ONE_POST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_ONE_POST_SUCCESS:
      return {
        ...state,
        entities: {
          posts: {
            [payload.post.id]: payload.post.data
          },
          users: {
            [payload.user.id]: payload.user.data
          }
        },
        error: null,
        isLoading: false
      }
    case FETCH_ONE_POST_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false
      }
    case FETCH_REPLIES_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_REPLIES_SUCCESS:
      return {
        ...state,
        entities: {
          posts: {
            [payload.id]: {
              ...state.entities.posts[payload.id],
              replies: payload.results
            }
          },
          replies: payload.replies,
          users: {
            ...state.entities.users,
            ...payload.users
          }
        },
        error: null,
        isLoading: false,
      }
    case FETCH_REPLIES_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false
      }
    case FETCH_ONE_POST_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false
      }
    default:
      return state
  }
}

function fetchPostsRequest() {
  return {
    type: FETCH_POSTS_REQUEST
  }
}

function fetchPostsSuccess(data) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: data
  }
}

function fetchPostsFail(err) {
  return {
    type: FETCH_POSTS_FAIL,
    payload: err
  }
}

function fetchOnePostRequest() {
  return {
    type: FETCH_ONE_POST_REQUEST
  }
}

function fetchOnePostSuccess(data) {
  return {
    type: FETCH_ONE_POST_SUCCESS,
    payload: data
  }
}

function fetchOnePostFail(err) {
  return {
    type: FETCH_ONE_POST_FAIL,
    payload: err
  }
}

function fetchRepliesRequest() {
  return {
    type: FETCH_REPLIES_REQUEST
  }
}

function fetchRepliesSuccess(data) {
  return {
    type: FETCH_REPLIES_SUCCESS,
    payload: data
  }
}

function fetchRepliesFail(err) {
  return {
    type: FETCH_REPLIES_FAIL,
    payload: err
  }
}

function transformOnePost(data) {
  let post = data[0].post
  post.createdBy = data[0].user.id
  let user = data[0].user

  return {
    post: {
      id: post.id,
      data: post
    },
    user: {
      id: user.id,
      data: user
    }
  }
}

function transformPosts(data) {
  let shell = {
    posts: {},
    users: {},
    results: []
  }

  return data.reduce((agg, item) => {
    let { post, user } = item
    post.createdBy = user.id
    agg.posts[`${post.id}`] = post
    agg.users[`${user.id}`] = user
    agg.results.push(post.id)
    return agg
  }, shell)
}

function transformReplies(data, id) {
  let shell = {
    id,
    results: [],
    replies: {},
    users: {}
  }

  return data.reduce((agg, item) => {
    let { user, reply, post } = item
    reply.createdBy = user.id
    agg.replies[reply.id] = reply
    agg.users[user.id] = user
    agg.results.push(reply.id)
    return agg
  }, shell)
}

export const fetchPosts = (limit = 10, page = 1) => dispatch => {
  dispatch(fetchPostsRequest())

  request
    .get(`http://localhost:4000/api/posts?limit=${limit}&page=${page}`)
    .then(res => {
      const data = transformPosts(res.body.data)
      dispatch(fetchPostsSuccess(data))
    })
    .catch(err => {
      dispatch(fetchPostsFail(err))
    })
}

export const fetchOnePost = (id) => dispatch => {
  dispatch(fetchOnePostRequest())
  request
    .get(`http://localhost:4000/api/posts/${id}`)
    .then(res => {
      const data = transformOnePost(res.body.data)
      dispatch(fetchOnePostSuccess(data))
    })
    .catch(err => {
      dispatch(fetchOnePostFail())
    })

  dispatch(fetchRepliesRequest())
  request
    .get(`http://localhost:4000/api/posts/${id}/replies`)
    .then(res => {
      const data = transformReplies(res.body.data, id)
      dispatch(fetchRepliesSuccess(data))
    })
    .catch(err => {
      dispatch(fetchRepliesFail(err))
    })
}
