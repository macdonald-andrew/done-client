import * as React from 'react'
import TextField from 'components/TextInput'
import MaterialAutocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'


const Autocomplete = ({ 
  value = null, 
  setValue = () => {},
  inputValue = null,
  setInputValue = () => {},
  options = [],
  label = '',
  loading = false
}) => {
  return (
    <MaterialAutocomplete
      disablePortal
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label} 
          InputProps={{...params.InputProps, endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          )
        }}/>
      )}
    />
  )
}

export default Autocomplete