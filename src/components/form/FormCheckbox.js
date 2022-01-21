import omit from 'lodash/omit'
import React from 'react'
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles(({ palette: { text } }) => ({
  labelText: {
    color: text.secondary,
    fontWeight: 700,
    fontSize: '16px',
  },
  helperText: {
    margin: '-5px 14px 10px 14px',
  },
}))


const FormCheckbox = ({
  disabled = false,
  fullWidth = false,
  style = {},
  field,
  label,
  touched,
  errorMessage,
  ...props
}) => {
  const classes = useStyles()
  // we don't include form prop comming from formik
  const newProps = omit(props, 'form')
  // sets new style to account for fullWidht prop
  const newStyle = fullWidth ? { width: '100%', ...style } : style
  return (
    <>
      <FormControlLabel
        label={label}
        disabled={disabled}
        classes={{ root: classes.labelText }}
        control={
          <Checkbox
            color='primary'
            checked={field.value}
            {...field}
            {...newProps}
          />
        }
        style={newStyle}
      />
      {touched && errorMessage && (
        <FormHelperText className={classes.helperText}>
          {errorMessage}
        </FormHelperText>
      )}
    </>
  )
}

export default FormCheckbox