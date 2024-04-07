import React from 'react'
import gifImage from '../../images/present.gif'
import CopyableText from '../CopyableText/CopyableText'

const HowToGiveUsAPresent = ({
  isSingleParticipant,
}: {
  isSingleParticipant: boolean
}) => {
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
            P.s. tutti ci campi in blu sono copiabili con un semplice click!
          </p>
          <img src={gifImage} alt="GIF" className="max-w-24" />
        </div>
        <div className="flex gap-1 mt-8">
          <div className="mt-4">
            <p className="font-bold">Beneficiario:</p>
            <CopyableText>{process.env.GATSBY_BANK_ACCOUNT_OWNER}</CopyableText>
            <p className="font-bold mt-2">Indirizzo Banca:</p>
            <CopyableText>{process.env.GATSBY_BANK_BANK_NAME}</CopyableText>
            <p className="font-bold mt-2">IBAN:</p>
            <CopyableText removeSpaces>
              {process.env.GATSBY_BANK_IBAN}
            </CopyableText>
            <p className="font-bold mt-2">Codice SWIFT/BIC:</p>
            <CopyableText>{process.env.GATSBY_BANK_SWIFT_BIC}</CopyableText>
            <p className="font-bold mt-2">Causale:</p>
            <CopyableText>{process.env.GATSBY_BANK_CAUSALE}</CopyableText>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToGiveUsAPresent
