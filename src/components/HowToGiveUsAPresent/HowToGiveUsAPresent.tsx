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
          Regalo
        </h2>
        {isSingleParticipant && (
          <div>
            <p>
              La tua <span className="font-extrabold">presenza</span> è il dono
              più grande per noi. Non sentirti obbligato a fare un regalo.
              Tuttavia, se desideri davvero farci un pensiero, ecco le
              coordinate bancarie per un eventuale contributo.
            </p>
          </div>
        )}
        {!isSingleParticipant && (
          <div>
            <p>
              La vostra <span className="font-extrabold">presenza</span> è il
              dono più grande per noi. Non sentitevi obbligati a fare un regalo.
              Tuttavia, se desiderate davvero farci un pensiero, ecco le
              coordinate bancarie per un eventuale contributo.
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
            <CopyableText>
              <span className="text-lg">
                {process.env.GATSBY_BANK_ACCOUNT_OWNER}
              </span>
            </CopyableText>
            <p className="font-bold mt-2">Indirizzo Banca:</p>
            <CopyableText>
              <span className="text-lg">
                {process.env.GATSBY_BANK_BANK_NAME}
              </span>
            </CopyableText>
            <p className="font-bold mt-2">IBAN:</p>
            <CopyableText removeSpaces>
              <span className="text-lg">{process.env.GATSBY_BANK_IBAN}</span>
            </CopyableText>
            <p className="font-bold mt-2">Codice SWIFT/BIC:</p>
            <CopyableText>
              <span className="text-lg">
                {process.env.GATSBY_BANK_SWIFT_BIC}
              </span>
            </CopyableText>
            <p className="font-bold mt-2">Causale:</p>
            <CopyableText>
              <span className="text-lg">{process.env.GATSBY_BANK_CAUSALE}</span>
            </CopyableText>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToGiveUsAPresent
