import _ from 'lodash'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { API_URL } from '../config'
import { getStoreState } from '../reduxStoreBinder'

const instance = axios.create({ baseURL: API_URL, withCredentials: true })

instance.defaults.headers.post['Content-Type'] = 'application/json'

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
    // set access token
    const token = getStoreState()?.user?.credentials?.idToken || null
    const tokenType = getStoreState()?.user?.credentials?.tokenType || null

    if (token && tokenType) {
        config.headers['Authorization'] = `${tokenType} ${token}`
    }

    config.headers['X-Correlation-ID'] = uuidv4()

    return config
  },
  (error) => Promise.reject(error)
)


instance.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response.data,
  (error) => {
    if (error.response) {
      // client received an error response (5xx, 4xx)
      error.message = _.get(
        error,
        ['response', 'data', 'message'],
        'Unable to parse error response.'
      )
      return Promise.reject(error)
    }
    if (error.request) {
      // client never received a response, or request never left
      error.message = 'Unable to connect to the server.'
      return Promise.reject(error)
    }
    // error while setting up the request - error.message
    return Promise.reject(error)
  }
)

export default instance