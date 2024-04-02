import * as React from 'react'
import { Fragment, useEffect, useState } from 'react'

const GoogleMaps = () => {
  const [isClient, setIsClient] = useState(false)
  const WEDDING_GOOGLE_MAPS_SRC = process.env.WEDDING_GOOGLE_MAPS_SRC

  useEffect(() => {
    setIsClient(true)
    console.log('Google maps src is', WEDDING_GOOGLE_MAPS_SRC)
  }, [])

  return (
    <Fragment>
      {isClient && (
        <Fragment>
          {WEDDING_GOOGLE_MAPS_SRC && (
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={WEDDING_GOOGLE_MAPS_SRC}
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
