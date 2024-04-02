import * as React from 'react'
import { Fragment } from 'react'

const GOOGLE_MAPS_SRC = process.env.GOOGLE_MAPS_SRC

const GoogleMaps = () => {
  return (
    <Fragment>
      {GOOGLE_MAPS_SRC && (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={GOOGLE_MAPS_SRC}
            title="Google Maps"
            className="w-full h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </Fragment>
  )
}

export default GoogleMaps
