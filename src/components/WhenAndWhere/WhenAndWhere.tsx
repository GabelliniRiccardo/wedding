import * as React from 'react'
import { Fragment } from 'react'

const GOOGLE_MAPS_SRC = process.env.GOOGLE_MAPS_SRC

const WhenAndWhere = () => {
  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4">Dove e Quando</h2>
        <p className="text-lg">
          Data e Ora del Matrimonio: 7 settembre 2024, ore 14:00
        </p>
      </div>
      {GOOGLE_MAPS_SRC && (
        <div className="relative rounded-3xl overflow-hidden h-96">
          <iframe
            src={GOOGLE_MAPS_SRC}
            title="Google Maps"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </Fragment>
  )
}

export default WhenAndWhere
