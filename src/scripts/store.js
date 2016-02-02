import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './ducks/reducer'
import { DevTools } from './containers'

let finalCreateStore
const logger = createLogger()
const middleWare = [thunk, logger]

if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(...middleWare)(createStore)
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleWare),
    DevTools.instrument()
  )(createStore)
}

export default finalCreateStore(rootReducer)
