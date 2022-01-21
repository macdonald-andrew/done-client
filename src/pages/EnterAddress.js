import _ from 'lodash'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from '../components/form/Form'
import { saveAddress } from '../actions/auth'
import Autocomplete from 'components/Autocomplete'
import Button from 'components/Button'
import useGeocode from 'hooks/useGeocode'
import useDebounce from 'hooks/useDebounce'

const INITIAL_VALUES = { address: '' }
const INPUT_FIELDS = [
  {
    name: 'address',
    placeholder: 'Address',
    size: 'small',
    type: 'text',
  }
]

// validation
const validationSchema = Yup.object({
  address: Yup.string()
    .required('Address is required.')
})


const ManualAddress = ({ saveAddress, isFetching, error }) => {
  const onSubmit = ({ address }) => {
    saveAddress(address)
  }
  return (
    <Form.Container
      title='Enter Address Manually'
      error={error}
    >
      <Form
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        isFetching={isFetching}
        buttonContent='Next'
        inputFields={INPUT_FIELDS}
      >
      </Form>
    </Form.Container>
  )
}

const EnterAddress = ({ saveAddress, isFetching, error }) => {
  const [address, setAddress] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)

  // we debounce the address change to minimize the amount of API calls made to google
  const debouncedAddress = useDebounce(address, 1000)
  const [isFetchingGeocode, addressSuggestions, isValidApiKey] = useGeocode(debouncedAddress)

  const options = _.map(addressSuggestions, ({ formattedAddress }) => formattedAddress)

  const onSubmit = () => {
    const address = _.find(addressSuggestions, ['formattedAddress', selectedAddress])
    const location = _.get(address, 'location')
    const placeId = _.get(address, 'placeId')

    saveAddress(selectedAddress, placeId, location)
  }

  if (!isValidApiKey) {
    return (
      <ManualAddress
        saveAddress={saveAddress}
        isFetching={isFetching}
        error={error}
      />
    )
  }

  return (
    <Form.Container
      title='Google API Address'
      error={error}
    >
      <div style={{ padding: '1rem' }}>
        <Autocomplete
          label='Address'
          inputValue={address}
          setInputValue={setAddress}
          value={selectedAddress}
          setValue={setSelectedAddress}
          options={options}
          loading={isFetchingGeocode}
        />
      </div>
      <Button fullWidth type='submit' disabled={isFetching} onClick={onSubmit}>Next</Button>
    </Form.Container>
  )
}

export default connect(
  ({
    auth: {
      saveAddressStatus: { isFetching, error }
    }
  }) => ({
    isFetching,
    error
  }),
  dispatch => bindActionCreators({ saveAddress }, dispatch)
)(EnterAddress)