import React from 'react'
import TextField from '@material-ui/core/TextField'

const TextInput = (props) => {
  return (
    <TextField
      {...props}
      fullWidth
      variant='outlined'
      size='small'
    />
  )
}

export default TextInput