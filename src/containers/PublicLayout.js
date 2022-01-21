import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'

const PublicLayout = ({ location }) => {
  return (
    <>
    <Navbar.Public/>
    <Switch>
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Redirect
          to={{ pathname: '/signin', state: { location } }}
        />
      </Switch>
    </>
  )
}

export default withRouter(PublicLayout)