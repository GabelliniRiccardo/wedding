import React, { useState } from 'react'
import { Tooltip } from '@mui/material'
import gifImage from '../../images/present.gif'

const HowToGiveUsAPresent = () => {
  const iban = 'IT00 XXXX XXXX XXXX XXXX XXXX XXX'
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    const ibanWithoutSpaces = iban.replace(/\s/g, '')
    navigator.clipboard.writeText(ibanWithoutSpaces)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 3000)
  }

  return (
    <div className="bg-orange-600 bg-opacity-25 p-6 rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center mb-8 text-lg gap-3">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Come darci un regalo
        </h2>
        <p>
          Non è necessario un regalo, poiché ciò che conta davvero è la vostra
          <span className="font-bold"> preziosa</span> presenza.
        </p>
        <p>
          Tuttavia, se desiderate fare un pensiero, ecco le coordinate bancarie
          per effettuare un bonifico:
        </p>
        <div className="flex justify-between items-center">
          <p>P.s. se si clicca l'IBAN viene automaticamente copiato</p>
          <img src={gifImage} alt="GIF" className="max-w-24" />
        </div>
        <div className="flex gap-1 mt-8">
          <div className="mt-4">
            <p className="font-bold">Beneficiario:</p>
            <p>Riccardo Gabellini</p>
            <p className="font-bold mt-2">Indirizzo Banca:</p>
            <p>Nome Banca</p>
            <p className="font-bold mt-2">IBAN:</p>
            <Tooltip
              title={copySuccess ? 'Copiato!' : 'Clicca per copiare'}
              arrow
            >
              <p
                className="text-lg cursor-pointer text-blue-500"
                onClick={copyToClipboard}
              >
                {iban}
              </p>
            </Tooltip>
            <p className="font-bold mt-2">Codice SWIFT/BIC:</p>
            <p>SWIFT/BIC</p>
            <p className="font-bold mt-2">Causale:</p>
            <p>Causale</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToGiveUsAPresent
