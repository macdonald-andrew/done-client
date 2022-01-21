import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import CreateProfile from './CreateProfile'
import EnterAddress from './EnterAddress'
import UploadLicense from './UploadLicense'
import Appointment from './Appointment'
import { formatTitle, formatPhoneNumber } from '../utils'

const Item = ({ name, value }) => {
  let formattedName = formatTitle(name)

  if (name === 'dob') {
    formattedName = _.toUpper(formattedName)
    value = new Date(value).toDateString()
  }
  if (name === 'phoneNumber') {
    value = formatPhoneNumber(value)
  }
  if (name === 'appointment') {
    value = new Date(value).toString()
  }

  return (
    <div style={{ display: 'flex', padding: '0.5rem' }}>
      <div style={{ minWidth: '200px', fontWeight: 600 }}>{formattedName + ': '}</div>
      <div>{value}</div>
    </div>
  )
}


const Profile = ({ user }) => {

  // profile
  const profileExists = _.get(user, 'profileExists', false)
  const addressExists = !_.isNil(user?.address)
  const licenseExists = _.get(user, 'license', null)
  const appointmentExists = _.get(user, 'appointment', null)

  if (!profileExists) {
    return <CreateProfile />
  }

  if (!addressExists) {
    return <EnterAddress />
  }

  if (!licenseExists) {
    return <UploadLicense />
  }

  if (!appointmentExists) {
    return <Appointment />
  }

  const profile = _.chain(user)
    .omit(['address', 'id', 'profileExists', 'appointment', 'role'])
    .set('address', _.get(user, ['address', 'address']))
    .value()

  return (
    <div style={{ maxWidth: '600px', backgroundColor: '#E7EBF0', margin: '100px auto', padding: '3rem' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center', fontWeight: 600 }}>User Information</div>
      {_.map(profile, (v, k) => <Item key={k} name={k} value={v} />)}
      <div style={{ margin: '40px 0px', textAlign: 'center', fontWeight: 600 }}>Appointment</div>
      <Item name='appointment' value={_.get(user, 'appointment')} />
    </div>
  )
}

export default connect(({ auth: { user } }) => ({ user }))(Profile)