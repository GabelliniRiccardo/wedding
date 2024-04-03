import * as React from 'react'
import { Fragment } from 'react'

const GoogleMaps = () => {
  return (
    <Fragment>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={process.env.GATSBY_GOOGLE_MAPS_SRC}
          title="Google Maps"
          className="w-full h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </Fragment>
  )
}

export default GoogleMaps
