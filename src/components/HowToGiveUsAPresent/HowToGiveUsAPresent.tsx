import * as React from 'react'

const HowToGiveUsAPresent = () => {
  return (
    <div className="p-4 my-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-w-yellow-lighter p-6 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center mb-8">
          <h2
            className="text-4xl font-bold mb-4 text-center"
            id="how-to-give-us-a-present-section"
          >
            Come darci un regalo
          </h2>
          <p className="text-lg mb-4">
            Non è necessario un regalo, ma se desiderate fare un pensiero, ecco
            le coordinate bancarie per effettuare un bonifico:
          </p>
          <p className="text-lg font-bold">
            IBAN: IT00 XXXX XXXX XXXX XXXX XXXX XXX
          </p>
        </div>
      </div>
    </div>
  )
}

export default HowToGiveUsAPresent
