import _ from 'lodash'
import React from 'react'
import PhoneInput from 'components/PhoneInput'


const FormPhoneInput = ({ field, form, touched, errorMessage, ...props}) => {
  // we don't include form prop comming from formik
  const newProps = _.omit(props, ['form', 'touched', 'errors'])
  const error = !!(touched && errorMessage)
  const helperText = touched && errorMessage ? errorMessage : null
  return (
    <PhoneInput
      helperText={helperText}
      error={error}
      {...field}
      {...newProps}
      onChange={value => {
        if(_.isNil(value)) {
          return
        }
        form.handleChange(value)
        form.setFieldValue(field.name, value)
      }}
    />
  )
}

export default FormPhoneInput