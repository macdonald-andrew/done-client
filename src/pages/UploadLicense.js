import _ from 'lodash'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FileInput from 'components/FileInput'
import Form from 'components/form/Form'
import { uploadLicense } from 'actions/auth'

const UploadLicense = ({ uploadLicense, error }) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [progress, setProgress] = useState(0)

  const uploadFile = () => {
    const file = _.get(selectedFiles, 0)
    if (!file) return
    setProgress(0)
    uploadLicense(file, setProgress)
      .then(res => setSelectedFiles([]))
      .finally(() => setProgress(0))
  }

  return (
    <Form.Container
      title='Upload Drivers License'
      error={error}
    >
      <FileInput
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        uploadFile={uploadFile}
        progress={progress}
      />
    </Form.Container>
  )
}

export default connect(
  ({
    auth: {
      uploadLicenseStatus: { error }
    }
  }) => ({
    error
  }),
  dispatch => bindActionCreators({ uploadLicense }, dispatch)
)(UploadLicense)