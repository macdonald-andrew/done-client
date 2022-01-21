import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Yup from 'yup'
import Form from '../components/form/Form'
import { createAppointment } from '../actions/auth'

// constants
const INITIAL_VALUES = { appointment: '' }

const INPUT_FIELDS = [
  {
    name: 'appointment',
    placeholder: 'Appointment',
    size: 'small',
    type: 'date',
    showTimeSelect: true
  }
]

// validation
const validationSchema = Yup.object({
  appointment: Yup.string()
    .required('Appointment is required.')
})


const CreateProfile = ({ createAppointment, isFetching, error }) => {

  const onSubmit = ({ appointment }) => {
    createAppointment(appointment)
  }

  return (
    <Form.Container
      title='Appointment'
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
  dispatch => bindActionCreators({ createAppointment }, dispatch)
)(CreateProfile)