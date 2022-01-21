import _ from 'lodash'
import React from 'react'
import { TextField } from '@material-ui/core'

const FormInput = ({ field, touched, errorMessage, ...props }) => {
  // we don't include form prop comming from formik
  const newProps = _.omit(props, ['form', 'touched', 'errors'])
  const error = !!(touched && errorMessage)
  const helperText = touched && errorMessage ? errorMessage : null
  return (
    <TextField
      variant='outlined'
      helperText={helperText}
      error={error}
      {...field}
      {...newProps}
    />
  )
}

export default FormInput