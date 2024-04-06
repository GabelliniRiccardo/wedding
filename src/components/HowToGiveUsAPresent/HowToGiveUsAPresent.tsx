import React, { useState } from 'react'
import { Tooltip } from '@mui/material'
import gifImage from '../../images/present.gif'

const HowToGiveUsAPresent = ({
  isSingleParticipant,
}: {
  isSingleParticipant: boolean
}) => {
  const iban = process.env.GATSBY_BANK_IBAN
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    const ibanWithoutSpaces = iban?.replace(/\s/g, '')
    navigator.clipboard.writeText(ibanWithoutSpaces ?? '')
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 3000)
  }

  return (
    <div className="bg-orange-400 bg-opacity-25 p-6 rounded-lg shadow-lg h-full">
      <div className="flex flex-col justify-between items-center mb-8 text-lg gap-3">
        <h2
          className="text-4xl font-bold mb-4 text-center"
          id="how-to-give-us-a-present-section"
        >
          Come darci un regalo
        </h2>
        {isSingleParticipant && (
          <div>
            <p>
              Non è necessario un regalo, poiché ciò che conta davvero è la tua
              <span className="font-bold"> preziosa</span> presenza.
            </p>
            <p>
              Tuttavia, se desideri fare un pensiero, ecco le coordinate
              bancarie per effettuare un bonifico:
            </p>
          </div>
        )}
        {!isSingleParticipant && (
          <div>
            <p>
              Non è necessario un regalo, poiché ciò che conta davvero è la
              vostra
              <span className="font-bold"> preziosa</span> presenza.
            </p>
            <p>
              Tuttavia, se desiderate fare un pensiero, ecco le coordinate
              bancarie per effettuare un bonifico:
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <p className="mt-8">
            P.s. se si clicca l'IBAN viene automaticamente copiato
          </p>
          <img src={gifImage} alt="GIF" className="max-w-24" />
        </div>
        <div className="flex gap-1 mt-8">
          <div className="mt-4">
            <p className="font-bold">Beneficiario:</p>
            <p>{process.env.GATSBY_BANK_ACCOUNT_OWNER}</p>
            <p className="font-bold mt-2">Indirizzo Banca:</p>
            <p>{process.env.GATSBY_BANK_BANK_NAME}</p>
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
            <p>{process.env.GATSBY_BANK_SWIFT_BIC}</p>
            <p className="font-bold mt-2">Causale:</p>
            <p>{process.env.GATSBY_BANK_CAUSALE}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToGiveUsAPresent
