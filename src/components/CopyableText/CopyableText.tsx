import React, { useState } from 'react'
import { Button, Tooltip } from '@mui/material'

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
      setTimeout(() => setCopySuccess(false), 1500)
    }
  }

  return (
    <Tooltip
      title={copySuccess ? 'Copiato!' : 'Clicca per copiare'}
      arrow
      PopperProps={{
        disablePortal: true,
      }}
      open={copySuccess}
      disableFocusListener
      disableHoverListener
      disableTouchListener
    >
      <Button
        onClick={copyToClipboard}
        style={{ color: 'royalblue', padding: 0 }}
      >
        {children}
      </Button>
    </Tooltip>
  )
}

export default CopyableText
