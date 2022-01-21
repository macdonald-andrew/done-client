import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './reducers'

// used by connected-react-router to sync with redux
export const history = createBrowserHistory()

const initialState = {}

export const configureStore = () => {
  let store

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return store
}