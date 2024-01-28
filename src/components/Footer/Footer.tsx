import React from 'react'
import './Footer.scss'
import moment from 'moment'

const Footer = () => {
  const date = moment()
  return (
    <footer className="bg-w-yellow-lighter text-yellow-600 py-8 rounded-t">
      <div className="container mx-auto text-center">
        <p>
          Copyright © {date.year()} Riccardo Gabellini. Tutti i diritti
          riservati.
        </p>
        <p>P.iva: 03845270549</p>
      </div>
    </footer>
  )
}

export default Footer
