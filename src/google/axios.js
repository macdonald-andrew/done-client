import _ from 'lodash'
import axios from 'axios'
import { GOOGLE_GEOCODE_API } from '../config'

const instance = axios.create({ baseURL: GOOGLE_GEOCODE_API })

instance.defaults.headers.post['Content-Type'] = 'application/json'

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