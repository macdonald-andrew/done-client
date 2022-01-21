import axios from './axios'
import GoogleClient from './api'
import { GOOGLE_GEOCODE_API_KEY } from '../config'

const api = new GoogleClient(axios, GOOGLE_GEOCODE_API_KEY)

export default api