import React from 'react'
import { Button as MaterialButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import colors from '../colors'


const PrimaryButton = withStyles(() => ({
  root: {
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '32px',
    color: colors.white,
    backgroundColor: colors.primary,
    '&:hover': {
      backgroundColor: colors.primaryDark,
    },
  },
}))(MaterialButton)

const SecondaryButton = withStyles(() => ({
  root: {
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '32px',
    color: colors.primary,
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      textDecoration: 'underline',
      textDecorationThickness: '3px',
      textUnderlineOffset: '5px'
    },
  },
}))(MaterialButton)


const Button = ({ children, ...props }) => {
  return <PrimaryButton variant='contained' {...props}>{children}</PrimaryButton>
}

const Secondary = ({ children, ...props }) => {
  return <SecondaryButton variant='contained' {...props}>{children}</SecondaryButton>
}

Button.Secondary = Secondary


export default Button