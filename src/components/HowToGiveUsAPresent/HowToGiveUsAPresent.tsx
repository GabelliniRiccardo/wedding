import * as React from 'react'
import gifImage from '../../images/present.gif'

const HowToGiveUsAPresent = () => {
  return (
    <div className="bg-w-yellow-lighter p-6 rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center mb-8 text-lg gap-3">
        <h2
          className="text-4xl font-bold mb-4 text-center"
          id="how-to-give-us-a-present-section"
        >
          Come darci un regalo
        </h2>
        <p>
          Non è necessario un regalo, poiché ciò che conta davvero è la vostra
          preziosa presenza.
        </p>
        <p>
          Tuttavia, se desiderate fare un pensiero, ecco le coordinate bancarie
          per effettuare un bonifico:
        </p>
        <p className="font-bold">IBAN: IT00 XXXX XXXX XXXX XXXX XXXX XXX</p>
        <div className="flex flex-wrap justify-between">
          <img src={gifImage} alt="GIF" className="max-w-20 ml-auto" />
        </div>
      </div>
    </div>
  )
}

export default HowToGiveUsAPresent
