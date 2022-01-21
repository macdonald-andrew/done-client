import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import Form from '../components/form/Form'
import Text from '../components/Text'
import paths from '../paths'
import { signup, SIGNUP_SUCCESS } from '../actions/auth'

// constants
const INITIAL_VALUES = { email: '', password: '' }

const INPUT_FIELDS = [
  {
    name: 'email',
    placeholder: 'Email',
    size: 'small',
    type: 'email',
  },
  {
    name: 'password',
    placeholder: 'Password',
    size: 'small',
    type: 'password',
  },
]

// validation
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required.'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters or more.')
    .required('Password is required.'),
})


const SignUp = ({ signup, isFetching, error }) => {

  // history
  const history = useHistory()

  const onSubmit = ({ email, password }) => {
    signup(email, password)
      .then(action => {
        if (action.type === SIGNUP_SUCCESS) {
          history.push(paths.signin)
        }
      })
  }

  return (
    <Form.Container
      title='Sign up'
      subtitle={
        <>
          Create an account in seconds. Already have an account? <Text.Link onClick={() => history.push(paths.signin)}>Log In</Text.Link>
        </>
      }
      error={error}
    >
      <Form
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        isFetching={isFetching}
        buttonContent='Sign Up'
        inputFields={INPUT_FIELDS}
      >
      </Form>
    </Form.Container>
  )
}

export default connect(
  ({
    auth: {
      signinStatus: { isFetching, error }
    }
  }) => ({
    isFetching,
    error
  }),
  dispatch => bindActionCreators({ signup }, dispatch)
)(SignUp)