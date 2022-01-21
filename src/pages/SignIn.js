import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import Form from '../components/form/Form'
import Text from '../components/Text'
import paths from '../paths'
import { signin, SIGNIN_SUCCESS } from '../actions/auth'

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


const SignIn = ({ signin, isFetching, error, location }) => {

  // history
  const history = useHistory()

  const onSubmit = ({ email, password }) => {
    signin(email, password)
      .then(action => {
        if (action.type === SIGNIN_SUCCESS) {
          const url = _.get(location, ['state', 'from'], '/')
          history.push(url)
        }
      })
  }

  return (
    <Form.Container
      title='Log In'
      error={error}
      subtitle={
        <>
          New? <Text.Link onClick={() => history.push(paths.signup)}>Create an account</Text.Link>
        </>
      }
    >
      <Form
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        isFetching={isFetching}
        buttonContent='Log In'
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
  dispatch => bindActionCreators({ signin }, dispatch)
)(SignIn)