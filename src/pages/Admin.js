import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import api from 'api'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Alert } from '@material-ui/lab'
import { formatPhoneNumber } from 'utils'


const Row = ({ patient }) => (
  <TableRow
    key={patient.email}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell component="th" scope="row">{patient.firstName}</TableCell>
    <TableCell>{patient.lastName}</TableCell>
    <TableCell>{patient.email}</TableCell>
    <TableCell>{new Date(patient.dob).toDateString()}</TableCell>
    <TableCell>{formatPhoneNumber(patient.phoneNumber)}</TableCell>
    <TableCell>{patient.address}</TableCell>
    <TableCell align="right">{new Date(patient.appointment).toString()}</TableCell>
  </TableRow>
)

const Admin = () => {
  const [patients, setPatients] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  const cleanupProfile = (patient) => {
    return _.chain(patient)
    .omit(['address', 'id', 'profileExists', 'role'])
    .set('address', _.get(patient, ['address', 'address']))
    .value()
  }

  useEffect(() => {
    setError(null)
    setIsFetching(true)
    api.getPatients()
      .then(res => {
        const data = _.map(res, e => cleanupProfile(e))
        setPatients(data)
      })
      .catch(err => setError(err.message || 'Unable to retrieve patients.'))
      .finally(() => setIsFetching(false))
  }, [])

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', width: '100%', height: 'calc(100vh - 88px)', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <div style={{ maxWidth: '1400px', backgroundColor: '#E7EBF0', margin: '100px auto', padding: '3rem' }}>
      {error && (
        <Alert severity='error' style={{ marginBottom: '20px' }}>
          {error}
        </Alert>
      )}
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ fontWeight: 700 }}>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Appointment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => <Row key={patient.email} patient={patient}/>)}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Admin