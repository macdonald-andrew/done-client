import _ from 'lodash'
import React, { forwardRef } from 'react'
import TextField from '@material-ui/core/TextField'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

const DateInput = ({ value = new Date(), onChange = () => {}, inputProps = {}, ...props }) => {
  const timeProps  = {
    timeFormat: 'HH:mm',
    timeIntervals: 15,
    timeCaption: 'time',
    dateFormat: 'MM/dd/yyyy h:mm aa'
  }
  const additionalProps = _.get(props, 'showTimeSelect', false) ? timeProps : {}
  return (
    <DatePicker 
      selected={value} 
      onChange={(date) => onChange(date)}

      customInput={<Input {...inputProps} />} 
      {...props}
      {...additionalProps}
    />
  )
}

export default DateInput