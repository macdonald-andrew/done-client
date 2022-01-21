import _ from 'lodash'
import React from 'react'
import DateInput from 'components/DateInput'


const FormDateInput = ({ field, form, touched, errorMessage, ...props}) => {
  // we don't include form prop comming from formik
  const newProps = _.omit(props, ['form', 'touched', 'errors'])
  const error = !!(touched && errorMessage)
  const helperText = touched && errorMessage ? errorMessage : null
  const inputProps = {error, helperText, ..._.omit(newProps, ['children', 'type', 'placeholder'])}
  return (
    <DateInput
      id={field.name}
      helperText={helperText}
      error={error}
      inputProps={inputProps}
      placeholderText={_.get(newProps, 'placeholder')}
      {...field}
      {...newProps}
      onChange={value => {
        form.setFieldValue(field.name, value)
      }}
    />
  )
}

export default FormDateInput