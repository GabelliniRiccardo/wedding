import * as React from 'react'
import { Fragment } from 'react'

const GoogleMaps = () => {
  return (
    <Fragment>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31490.14128069595!2d12.139449599566376!3d43.59140053617411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132c7125142f78cb%3A0xa766198018073093!2sIl%20Castiglione%20Agriturismo%20Bio!5e0!3m2!1sit!2sit!4v1712054833704!5m2!1sit!2sit"
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
