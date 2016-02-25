// import createReducer from '.'

// function createEntityReducer(initState, actionGroup, handlers={}) {
//   const defaultHandlers = {
//     [actionGroup.CREATE_ONE.REQUEST](state, action) {
//       return state
//       .mergeIn(['CREATE_ONE'] {
//         errors: [],
//         isLoading: true
//       })
//     },
//     [actionGroup.CREATE_ONE.SUCCESS](state, { payload }) {
//       return state
//       .mergeIn(['data', payload.id], payload)
//       .setIn(['CREATE_ONE', 'errors'], [])
//     },
//     [actionGroup.CREATE_ONE.FAIL](state, { payload }) {
//       return state
//       .setIn(['CREATE_ONE', 'errors'], payload)
//     },
//     [actionGroup.CREATE_ONE.COMPLETE](state, _) {
//       return state
//       .setIn(['CREATE_ONE', 'isLoading'], false)
//     }
//   }

//   const finalHandlers = Object.keys(handlers).reduce((prev, curr) => {
//     prev[curr] = (state, action) => {
//       const newState = defaultHandlers[curr](state, action)
//       return handlers[action.type](state, action, newState)
//     }
//   }, defaultHandlers)

//   return createReducer(initState, finalHandlers)
// }

// export default createEntityReducer
