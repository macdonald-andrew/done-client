import React from 'react'
import colors from '../colors'

const Text = ({ children, style = {}, ...props }) => {
  return (
    <div 
      style={{
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '28px',
      color: colors.gray2,
      ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

const Title = ({ children, style = {}, ...props }) => {
    return (
      <div 
        style={{
          fontSize: '24px',
          fontWeight: 700,
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    )
  }

  const Subtitle = ({ children, style = {}, ...props }) => {
    return (
      <div 
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: colors.gray4,
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    )
  }

const Muted = ({ children, style = {}, ...props }) => {
  return (
    <div 
      style={{
        color: colors.gray2,
        fontSize: '14px',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

const Note = ({ children, style = {}, ...props }) => {
  return (
    <div 
      style={{
        color: colors.gray3,
        fontSize: '12px',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}


const Link = ({ children, style = {}, ...props }) => {
  return (
    <span 
      style={{
        color: colors.primary,
        cursor: 'pointer',
        fontSize: '14px',
        ...style
      }}
      {...props}
    >
      {children}
    </span>
  )
}

Text.Title = Title
Text.Subtitle = Subtitle
Text.Muted = Muted
Text.Note = Note
Text.Link = Link

export default Text