import React, { forwardRef } from 'react'
import TextField from '@material-ui/core/TextField'
import 'react-phone-number-input/style.css'
import ReactPhoneInput from 'react-phone-number-input/input'


const Input = forwardRef((props, ref) => {
  return (
    <TextField
      {...props}
      inputRef={ref}
      fullWidth
      variant='outlined'
    />
  )
})

const PhoneInput = (props) => {
  return (
    <ReactPhoneInput
      country='US'
      inputComponent={Input}
      {...props}
    />
  )
}

export default PhoneInput