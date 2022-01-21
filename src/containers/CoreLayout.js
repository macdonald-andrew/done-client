import _ from 'lodash'
import React, { Component, Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import Loader from '../components/Loader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import { bootstrap } from '../actions/bootstrap'
import Navbar from '../components/Navbar'

const PublicLayout = lazy(() => import('./PublicLayout'))
const Profile = lazy(() => import('../pages/Profile'))
const Admin = lazy(() => import('../pages/Admin'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))


export class CoreLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasBootstrapped: false
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    showOnboarding: PropTypes.bool,
    isBootstrapping: PropTypes.bool,
    isDataLoaded: PropTypes.bool,
    bootstrap: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.bootstrap().then(() => this.setState({ hasBootstrapped: true }))
  }

  componentDidUpdate(prevProps) {
    // bootstrap on login, signup, etc.
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      this.props.bootstrap()
    }
  }

  renderCore(isAdmin) {
    const component = isAdmin ? Admin : Profile
    return (
      <Switch>
        <Redirect from='/signin' to='/' />
        {/* projects */}
        <Route path='/' exact component={component} />
        <Route component={PageNotFound} />
      </Switch>
    )
  }

  render() {
    const {
      isAuthenticated,
      isBootstrapping,
      isDataLoaded,
      isAdmin
    } = this.props

    const showLoader = isBootstrapping ||
      // prevent initial render just before bootstrapping
      !this.state.hasBootstrapped ||
      // prevent render after login and just before bootstrapping
      (isAuthenticated && !isDataLoaded)

    if (showLoader) {
      return <Loader active size='large' />
    }

    if (!isAuthenticated) {
      return <PublicLayout />
    }


    return (
        <Suspense fallback={<Loader active size='large' />}>
          <Navbar.Private/>
          <div>
            {this.renderCore(isAdmin)}
          </div>
        </Suspense>
    )
  }
}

export default connect(
  ({ auth, bootstrap: { isBootstrapping, isDataLoaded } }) => ({
    isBootstrapping,
    isDataLoaded,
    isAuthenticated: !!auth.user,
    isAdmin: _.get(auth, ['user', 'role']) === 'admin'
  }),
  dispatch => bindActionCreators({ bootstrap }, dispatch)
)(CoreLayout)