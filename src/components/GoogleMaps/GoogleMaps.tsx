import * as React from 'react'
import { Fragment, useEffect, useState } from 'react'

const GoogleMaps = () => {
  const [isClient, setIsClient] = useState(false)
  const GOOGLE_MAPS_SRC = process.env.GOOGLE_MAPS_SRC

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Fragment>
      {isClient && (
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
      )}
    </Fragment>
  )
}

export default GoogleMaps
