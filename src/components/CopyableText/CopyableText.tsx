import React, { useState } from 'react'
import { Tooltip } from '@mui/material'

interface CopyableTextProps {
  children: React.ReactNode
  removeSpaces?: boolean
}

const CopyableText: React.FC<CopyableTextProps> = ({
  children,
  removeSpaces = false,
}) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    if (children) {
      const textToCopy = removeSpaces
        ? (children as string).replace(/\s/g, '')
        : children.toString()
      navigator.clipboard.writeText(textToCopy)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000) // Reset copy success message after 2 seconds
    }
  }

  return (
    <Tooltip title={copySuccess ? 'Copiato!' : 'Clicca per copiare'} arrow>
      <p
        className="text-lg cursor-pointer text-blue-700"
        onClick={copyToClipboard}
      >
        {children}
      </p>
    </Tooltip>
  )
}

export default CopyableText
