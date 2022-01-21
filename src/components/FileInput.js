import _ from 'lodash'
import React, { useState } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Button } from '@material-ui/core'

const UploadButton = ({ buttonContent = '', onChange = () => {} }) => (
  <label htmlFor='btn-upload'>
    <input
      id='btn-upload'
      style={{ display: 'none' }}
      type='file'
      onChange={onChange} />
    <Button
      variant='outlined'
      component='span'
    >
      {buttonContent}
    </Button>
  </label>
)

const FileInput = ({ 
  selectedFiles = [],
  setSelectedFiles = () => {},
  uploadFile = () => {}, 
  progress = 0
}) => {

  const onChange = (evt) => setSelectedFiles(evt.target.files)

  return (
    <div style={{ display: 'flex', padding: '1rem', flexDirection: 'column' }}>

        {_.size(progress) > 0 && <LinearProgress
          variant='determinate'
          value={progress}
        />}

        <div style={{ display: 'flex', margin: 'auto', marginTop: '20px' }}>
          <div style={{ width: '500px', textAlign: 'center', padding: '20px 0px', border: '1px solid rgba(0,0,0,0.5)' }}>
          {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
          </div>
          <UploadButton  
            buttonContent='Choose Files'
            onChange={onChange}
          />
        </div>
        
        <Button
          color='primary'
          variant='contained'
          component='span'
          disabled={!selectedFiles}
          onClick={uploadFile}
          style={{ margin: '10px auto' }}
        >
          Upload
        </Button>
    </div>
  )
}

export default FileInput