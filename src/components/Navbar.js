import _ from 'lodash'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from './Button'
import colors from '../colors'
import paths from '../paths'
import { logout } from '../actions/auth'
import { connectComponent } from '../reduxStoreBinder'

export const NAVBAR_HEIGHT = '88px'

const Navbar = ({ children }) => {
  // history
  const history = useHistory()

  return (
    <div style={{
      height: NAVBAR_HEIGHT,
      backgroundColor: colors.gray,
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <Button.Secondary onClick={() => history.push('/')}>LOGO</Button.Secondary>
      {children}
    </div>
  )
}

const Public = () => {
  // history
  const history = useHistory()

  return (
    <Navbar>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Button.Secondary onClick={() => history.push(paths.signin)} style={{ marginRight: '10px' }}>Log In</Button.Secondary>
        <Button onClick={() => history.push(paths.signup)}>Sign Up</Button>
      </div>
    </Navbar>
  )
}

const Private = ({ logout }) => {
  const test = () => {
    logout()
  }
  return (
    <Navbar>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Button.Secondary onClick={test} style={{ marginRight: '10px' }}>Log Out</Button.Secondary>
      </div>
    </Navbar>
  )
}

Navbar.Public = Public
Navbar.Private = connectComponent(Private, undefined, { logout })

export default Navbar