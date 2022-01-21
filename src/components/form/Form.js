import _ from 'lodash'
import React from 'react'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Alert } from '@material-ui/lab'
import { FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FormInput from 'components/form/FormInput'
import FormCheckbox from 'components/form/FormCheckbox'
import Button from 'components/Button'
import Text from '../Text'
import FormPhoneInput from 'components/form/FormPhoneInput'
import FormDateInput from 'components/form/FormDateInput'


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
})

const getInputComponent = type => {
  if (type === 'tel') {
    return FormPhoneInput
  }
  if (type === 'date') {
    return FormDateInput
  }
  return FormInput
}

const Form = ({
  initialValues,
  onSubmit,
  validationSchema,
  children = null,
  isFetching,
  buttonContent,
  inputFields,
  checkboxFields = [], 
}) => {

 // returns true if errors obj contains any checkbox property
 const isCheckboxError = (obj) => checkboxFields.map(({ name }) => name).some((key) => key in obj)

 return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ touched, errors }) => (
        <FormikForm>
          {/* input fields */}
          {_.map(inputFields, (field) => (
            <Field
              fullWidth
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              size={field.size}
              type={field.type}
              touched={_.get(touched, field.name)}
              errorMessage={_.get(errors, field.name)}
              component={getInputComponent(field.type)}
              style={{ marginBottom: '15px' }}
              showTimeSelect={field.showTimeSelect || false}
            />
          ))}
          {/* checkbox fields */}
          {_.size(checkboxFields) > 0 && (
            <FormControl
              error={isCheckboxError(errors)}
              style={{ width: '100%' }}
            >
              {_.map(checkboxFields, (field, index) => (
                <Field
                  fullWidth
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  touched={_.get(touched, field.name)}
                  errorMessage={_.get(errors, field.name)}
                  component={FormCheckbox}
                  style={{
                    marginBottom:
                      checkboxFields.length === index + 1 ? '5px' : '0px',
                  }}
                />
              ))}
            </FormControl>
          )}
          {/* children */}
          {!_.isNull(children) && children}
          {/* button */}
          <Button fullWidth type='submit' disabled={isFetching}>
            {buttonContent}
          </Button>
        </FormikForm>
      )}
    </Formik>
 )
}

const Container = ({
  title,
  subtitle,
  error,
  success,
  children, 
  style = {},
  ...props 
}) => {
  // style
  const classes = useStyles()

  return (
    <div style={{ maxWidth: '550px', margin: 'auto', marginTop: '4rem', padding: '2rem', ...style }} {...props}>
      <div className={classes.container}>
        {title && <Text.Title style={{ marginBottom: '10px' }}>{title}</Text.Title>}
      { subtitle && <Text.Muted style={{ marginBottom: '16px' }}>{subtitle}</Text.Muted>}

        {error && (
          <Alert severity='error' style={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity='success' style={{ marginBottom: '20px' }}>
            {success}
          </Alert>
        )}

        {children}

      </div>
    </div>
  )
}

Form.Container = Container

export default Form