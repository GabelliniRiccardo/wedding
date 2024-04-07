import React, { useState } from 'react'
import { Tooltip } from '@mui/material'

interface CopyableTextProps {
  children: React.ReactNode
}

const CopyableText: React.FC<CopyableTextProps> = ({ children }) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    if (children) {
      navigator.clipboard.writeText(children.toString())
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000) // Reset copy success message after 2 seconds
    }
  }

  return (
    <Tooltip title={copySuccess ? 'Copiato!' : 'Clicca per copiare'} arrow>
      <p
        className="text-lg cursor-pointer text-blue-500"
        onClick={copyToClipboard}
      >
        {children}
      </p>
    </Tooltip>
  )
}

export default CopyableText
