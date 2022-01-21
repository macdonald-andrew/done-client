import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import auth from './auth'
import bootstrap from './bootstrap'
import { RESET } from '../actions/auth'

// used by connected-react-router to sync with redux
export const history = createBrowserHistory()

const makeRootReducer = history => {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    auth,
    bootstrap
  })

  return (state, action) => {
    // reset global state (for example on logout)
    if (action.type === RESET) {
      state = undefined
    }
    return rootReducer(state, action)
  }
}

export const rootReducer = makeRootReducer(history)