
export const API_BASE = process.env.REACT_APP_BASE_URL || 'http://localhost:4100'
export const API_URL = API_BASE + '/api'

export const GOOGLE_GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json'
export const GOOGLE_GEOCODE_API_KEY = process.env.REACT_APP_GOOGLE_GEOCODE_API_KEY || 'PLACE_API_KEY_HERE'