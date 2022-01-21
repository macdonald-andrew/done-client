import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Yup from 'yup'
import Form from '../components/form/Form'
import { createProfile } from '../actions/auth'

// constants
const INITIAL_VALUES = { firstName: '', lastName: '', dob: '', phoneNumber: '' }

const INPUT_FIELDS = [
  {
    name: 'firstName',
    placeholder: 'First Name',
    size: 'small',
    type: 'text',
  },
  {
    name: 'lastName',
    placeholder: 'Last Name',
    size: 'small',
    type: 'text',
  },
  {
    name: 'dob',
    placeholder: 'Date of Birth',
    size: 'small',
    type: 'date',
  },
  {
    name: 'phoneNumber',
    placeholder: 'Phone Number',
    size: 'small',
    type: 'tel',
  },
  // {
  //   name: 'appointment',
  //   placeholder: 'Appointment',
  //   size: 'small',
  //   type: 'date',
  //   showTimeSelect: true
  // },
]

// validation
const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required.'),
  lastName: Yup.string()
    .required('Last name is required.'),
  dob: Yup.string()
    .required('Date of birth is required.'),
  phoneNumber: Yup.string()
    .length(12, 'Please enter a valid phone number')
    .required('Phone number is required.')
})


const CreateProfile = ({ createProfile, isFetching, error }) => {

  const onSubmit = values => {
    createProfile(values)
  }

  return (
    <Form.Container
      title='New Patient'
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

export default connect(
  ({
    auth: {
      createProfileStatus: { isFetching, error }
    }
  }) => ({
    isFetching,
    error
  }),
  dispatch => bindActionCreators({ createProfile }, dispatch)
)(CreateProfile)