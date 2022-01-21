import api from '../api'

// signup
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const signup = (email, password) => (dispatch, getState) => {
  if (getState().auth.signupStatus.isFetching) {
    return Promise.resolve()
  }
  dispatch({ type: SIGNUP_REQUEST })

  return api.signUp(email, password)
    .then(user =>
      dispatch({
        type: SIGNUP_SUCCESS,
        user
      })
    )
    .catch(error => dispatch({ type: SIGNUP_FAILURE, error }))
}

// login
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE'

export const signin = (email, password) => (dispatch, getState) => {
  if (getState().auth.signinStatus.isFetching) {
    return Promise.resolve()
  }
  dispatch({ type: SIGNIN_REQUEST })

  return api.signIn(email, password)
    .then(user =>
      dispatch({
        type: SIGNIN_SUCCESS,
        user
      })
    )
    .catch(error => dispatch({ type: SIGNIN_FAILURE, error }))
}

// fetch user
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

export const fetchUser = () => (dispatch, getState) => {
  if (getState().auth.fetchUserStatus.isFetching) {
    return Promise.resolve()
  }
  dispatch({ type: FETCH_USER_REQUEST })

  return api.fetchUser()
    .then(user =>
      dispatch({
        type: FETCH_USER_SUCCESS,
        user
      })
    )
    .catch(error => dispatch({ type: FETCH_USER_FAILURE, error }))
}

// logout
export const RESET = 'RESET'

export const logout = () => dispatch => {
  // delete server session but ignore result
  api.signOut()
  // handled at root reducer to reset global state
  return Promise.resolve(dispatch({ type: RESET }))
}

// create profile
export const CREATE_PROFILE_REQUEST = 'CONFIRM_EMAIL_REQUEST'
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS'
export const CREATE_PROFILE_FAILURE = 'CREATE_PROFILE_FAILURE'

export const createProfile = ({firstName, lastName, dob, phoneNumber}) => (dispatch, getState) => {
  if (getState().auth.createProfileStatus.isFetching) {
    return Promise.resolve()
  }
  dispatch({ type: CREATE_PROFILE_REQUEST })

  return api.createProfile(firstName, lastName, dob, phoneNumber)
    .then(res =>
      dispatch({
        type: CREATE_PROFILE_SUCCESS,
        user: res
      })
    )
    .catch(error => dispatch({ type: CREATE_PROFILE_FAILURE, error }))
}


// save address
export const SAVE_ADDRESS_REQUEST = 'SAVE_ADDRESS_REQUEST'
export const SAVE_ADDRESS_SUCCESS = 'SAVE_ADDRESS_SUCCESS'
export const SAVE_ADDRESS_FAILURE = 'SAVE_ADDRESS_FAILURE'

export const saveAddress = (selectedAddress, placeId, location) => (dispatch, getState) => {
  if (getState().auth.saveAddressStatus.isFetching) {
    return Promise.resolve()
  }
  dispatch({ type: SAVE_ADDRESS_REQUEST })

  return api.saveAddress(selectedAddress, placeId, location)
    .then(res =>
      dispatch({
        type: SAVE_ADDRESS_SUCCESS,
        address: res
      })
    )
    .catch(error => dispatch({ type: SAVE_ADDRESS_FAILURE, error }))
}


// upload license
export const UPLOAD_LICENSE_REQUEST = 'UPLOAD_LICENSE_REQUEST'
export const UPLOAD_LICENSE_SUCCESS = 'UPLOAD_LICENSE_SUCCESS'
export const UPLOAD_LICENSE_FAILURE = 'UPLOAD_LICENSE_FAILURE'

export const uploadLicense = (file, setProgress) => (dispatch, getState) => {
  if (getState().auth.uploadLicenseStatus.isFetching) {
    return Promise.resolve()
  }
  dispatch({ type: UPLOAD_LICENSE_REQUEST })

  return api.uploadLicense(file, setProgress)
    .then(res =>
      dispatch({
        type: UPLOAD_LICENSE_SUCCESS,
        user: res
      })
    )
    .catch(error => dispatch({ type: UPLOAD_LICENSE_FAILURE, error }))
}


// create an appointment
export const CREATE_APPOINTMENT_REQUEST = 'CREATE_APPOINTMENT_REQUEST'
export const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS'
export const CREATE_APPOINTMENT_FAILURE = 'CREATE_APPOINTMENT_FAILURE'

export const createAppointment = (appointment) => (dispatch, getState) => {
  if (getState().auth.createAppointmentStatus.isFetching) {
    return Promise.resolve()
  }
  dispatch({ type: CREATE_APPOINTMENT_REQUEST })

  return api.createAppointment(appointment)
    .then(res =>
      dispatch({
        type: CREATE_APPOINTMENT_SUCCESS,
        user: res
      })
    )
    .catch(error => dispatch({ type: CREATE_APPOINTMENT_FAILURE, error }))
}