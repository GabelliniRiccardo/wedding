import * as React from 'react'
import { Fragment } from 'react'
import gifImage from '../../images/pandas.gif'
import GoogleMaps from '../GoogleMaps/GoogleMaps'

const WhenAndWhere = () => {
  return (
    <Fragment>
      <div className="bg-green-400 bg-opacity-20 rounded-lg shadow-lg flex flex-col justify-between h-full w-full">
        <div className="p-6">
          <h1
            className="text-6xl font-bold mb-4 text-center text-green-900"
            id="when-and-where-section"
          >
            7 Settembre 2024
          </h1>
          <div className="flex flex-col space-y-4 text-green-800 text-xl">
            <div>
              <p className="font-bold text-green-700">
                Il matrimonio sarà celebrato presso:
              </p>
              <p className="text-green-900">Comune di San Giustino</p>
            </div>
            <div>
              <p className="font-bold text-green-700">
                Dopo la cerimonia, ci sposteremo a:
              </p>
              <p className="text-green-900">Il Castiglione Agriturismo Bio</p>
            </div>
            <div className="flex flex-wrap justify-between">
              <div>
                <p className="font-bold text-green-700">Indirizzo:</p>
                <p className="text-green-900">
                  Via Basilica, 77, 52037 Sansepolcro AR
                </p>
              </div>
              <img src={gifImage} alt="GIF" className="max-w-20 ml-auto" />
            </div>
          </div>
        </div>
        <GoogleMaps />
      </div>
    </Fragment>
  )
}

export default WhenAndWhere
