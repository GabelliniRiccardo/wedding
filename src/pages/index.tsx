import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout/Layout'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout showNavbar={true}>
      <section id="when-and-where-section">
        <h2 className="text-2xl">Dove e Quando</h2>
        <p>Data e Ora del Matrimonio</p>
      </section>

      <section id="how-to-give-us-a-present-section">
        <h2 className="text-2xl">Come Darci un Regalo</h2>
        <p>informazioni su iban ecc</p>
      </section>

      <section id="confirm-presence-section">
        <h2 className="text-2xl">Conferma presenza</h2>
        <p>Form per inserire conferma</p>
      </section>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Wedding Riccardo & Chiara</title>
