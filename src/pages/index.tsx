import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { Container, Typography } from '@mui/material'
import Layout from '../components/Layout/Layout'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Container>
        <Typography variant="h1" id="home-section">
          Il nostro Matrimonio
        </Typography>
        <Typography variant="subtitle1">
          Unisciti a noi per celebrare questo giorno speciale
        </Typography>

        <section id="when-and-where-section">
          <Typography variant="h2">Dove e Quando</Typography>
          <Typography variant="body1">Data e Ora del Matrimonio</Typography>
        </section>

        <section id="location-section">
          <Typography variant="h2">Luogo</Typography>
          {/* Aggiungi la mappa di Google Maps qui */}
        </section>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Wedding Riccardo & Chiara</title>
