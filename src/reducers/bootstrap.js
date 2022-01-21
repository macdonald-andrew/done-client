import { BOOTSTRAP_START, BOOTSTRAP_FINISH } from '../actions/bootstrap'

const initialState = {
  isBootstrapping: false,
  isDataLoaded: false
}

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case BOOTSTRAP_START:
      return {
        ...state,
        isBootstrapping: true
      }
    case BOOTSTRAP_FINISH:
      return {
        ...state,
        isBootstrapping: false,
        isDataLoaded: action.isDataLoaded
      }

    default:
      return state
  }
}