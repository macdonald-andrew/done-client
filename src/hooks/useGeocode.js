import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import google from '../google'

const STATUS = {
  OK: 'OK',
  ZERO_RESULTS: 'ZERO_RESULTS',
  REQUEST_DENIED: 'REQUEST_DENIED'
}

const keyMap = {
  street_number: 'number',
  subpremise: 'unit',
  route: 'street',
  locality: 'city',
  administrative_area_level_1: 'state',
  country: 'country',
  postal_code: 'zip'
}

const formatAddress = (address) => {
  const placeId = _.get(address, 'place_id')
  const formattedAddress = _.get(address, 'formatted_address')

  const addressComponents = _.chain(address)
    .get('address_components')
    .reduce((acc, { short_name, types }) => {
      const key = keyMap[types[0]]
      if (!_.isUndefined(key)) {
        acc[key] = short_name
      }
      return acc
    }, {})
    .value()

  const location = _.get(address, ['geometry', 'location'])

  return {
    placeId, formattedAddress, addressComponents, location
  }
}

const useGeocode = (address = null) => {

  const [isFetching, setIsFetching] = useState(false)
  const [isValidApiKey, setIsValidApiKey] = useState(true)
  const [addressSuggestions, setAddressSuggestions] = useState([])

  const updateCoordinates = async () => {
    if (_.isNil(address) || _.isEmpty(address)) {
      return
    }
    try {
      setIsFetching(true)
      const { status, results } = await google.geocode(address)
      if (status === STATUS.OK) {
        const formattedAddresses = _.map(results, (e) => formatAddress(e))
        setAddressSuggestions(formattedAddresses)
      }
      setIsValidApiKey(status !== STATUS.REQUEST_DENIED)
    } catch(err) {
      setIsValidApiKey(false)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    updateCoordinates()
  }, [address])

  return [isFetching, addressSuggestions, isValidApiKey]
}

export default useGeocode