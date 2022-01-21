import * as actions from '../actions/auth'

const initialState = {
  user: null,

  signupStatus: {
    isFetching: false,
    error: null
  },
  signinStatus: {
    isFetching: false,
    error: null
  },
  fetchUserStatus: {
    isFetching: false,
    error: null
  },
  createProfileStatus: {
    isFetching: false,
    error: null
  },
  saveAddressStatus: {
    isFetching: false,
    error: null
  },
  uploadLicenseStatus: {
    isFetching: false,
    error: null
  },
  createAppointmentStatus: {
    isFetching: false,
    error: null
  }
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.SIGNUP_REQUEST:
      return {
        ...state,
        signupStatus: {
          isFetching: true,
          error: null
        }
      }
    case actions.SIGNUP_FAILURE:
      return {
        ...state,
        signupStatus: {
          isFetching: false,
          error: action.error
        }
      }
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        signupStatus: {
          isFetching: false,
          error: null
        }
      }

    case actions.SIGNIN_REQUEST:
      return {
        ...state,
        signinStatus: {
          isFetching: true,
          error: null
        }
      }
    case actions.SIGNIN_FAILURE:
      return {
        ...state,
        signinStatus: {
          isFetching: false,
          error: action.error.message
        }
      }
    case actions.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        signinStatus: {
          isFetching: false,
          error: null
        }
      }

    case actions.FETCH_USER_REQUEST:
      return {
        ...state,
        fetchUserStatus: {
          isFetching: true,
          error: null
        }
      }
    case actions.FETCH_USER_FAILURE:
      return {
        ...state,
        fetchUserStatus: {
          isFetching: false,
          error: action.error.message
        }
      }
    case actions.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        fetchUserStatus: {
          isFetching: false,
          error: null
        }
      }
    case actions.CREATE_PROFILE_REQUEST:
      return {
        ...state,
        createProfileStatus: {
          isFetching: true,
          error: null
        }
      }
    case actions.CREATE_PROFILE_FAILURE:
      return {
        ...state,
        createProfileStatus: {
          isFetching: false,
          error: action.error.message
        }
      }
    case actions.CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        createProfileStatus: {
          isFetching: false,
          error: null
        }
      }
    case actions.SAVE_ADDRESS_REQUEST:
      return {
        ...state,
        saveAddressStatus: {
          isFetching: true,
          error: null
        }
      }
    case actions.SAVE_ADDRESS_FAILURE:
      return {
        ...state,
        saveAddressStatus: {
          isFetching: false,
          error: action.error.message
        }
      }
    case actions.SAVE_ADDRESS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          address: action.address
        },
        saveAddressStatus: {
          isFetching: false,
          error: null
        }
      }
    case actions.UPLOAD_LICENSE_REQUEST:
      return {
        ...state,
        uploadLicenseStatus: {
          isFetching: true,
          error: null
        }
      }
    case actions.UPLOAD_LICENSE_FAILURE:
      return {
        ...state,
        uploadLicenseStatus: {
          isFetching: false,
          error: action.error.message
        }
      }
    case actions.UPLOAD_LICENSE_SUCCESS:
      return {
        ...state,
        user: action.user,
        uploadLicenseStatus: {
          isFetching: false,
          error: null
        }
      }
    case actions.CREATE_APPOINTMENT_REQUEST:
      return {
        ...state,
        createAppointmentStatus: {
          isFetching: true,
          error: null
        }
      }
    case actions.CREATE_APPOINTMENT_FAILURE:
      return {
        ...state,
        createAppointmentStatus: {
          isFetching: false,
          error: action.error.message
        }
      }
    case actions.CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        user: action.user,
        createAppointmentStatus: {
          isFetching: false,
          error: null
        }
      }
    default:
      return state
  }
}

export default reducer