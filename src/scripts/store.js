import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './ducks/reducer'
import { watchLogin, watchRegister, watchLogout } from './sagas'
import { DevTools } from './containers'

let finalCreateStore
const logger = createLogger()
const sagaMiddleware = createSagaMiddleware(watchLogin, watchRegister, watchLogout)
const middleware = [thunk, logger, sagaMiddleware]
const devMiddleware = [logger]


if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(...middleware)(createStore)
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware.concat(devMiddleware)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)
}

export default finalCreateStore(rootReducer)
