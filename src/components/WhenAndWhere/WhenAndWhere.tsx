import * as React from 'react'
import gifImage from '../../images/pandas.gif'

const WhenAndWhere = () => {
  return (
    <div className="bg-w-yellow-lighter p-6 rounded-lg shadow-lg">
      <h2
        className="text-4xl font-bold mb-4 text-center text-gray-800"
        id="when-and-where-section"
      >
        Dove e Quando
      </h2>
      <div className="flex flex-col space-y-4">
        <div>
          <p className="text-lg font-bold">Nome:</p>
          <p className="text-lg">Il Castiglione Agriturismo Bio</p>
        </div>
        <div>
          <p className="text-lg font-bold">Indirizzo:</p>
          <p className="text-lg">Via Basilica, 77, 52037 Sansepolcro AR</p>
        </div>
        <div className="flex flex-wrap justify-between">
          <div>
            <p className="text-lg font-bold">Data e Ora:</p>
            <p className="text-lg">7 settembre 2024, ore 14:00</p>
          </div>
          <img src={gifImage} alt="GIF" className="max-w-16 ml-auto" />
        </div>
      </div>
    </div>
  )
}

export default WhenAndWhere
