import * as React from 'react'
import { motion } from 'framer-motion'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout/Layout'
import { Container } from '@mui/material'
import coupleImg from '../images/couple.jpg'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout showNavbar={true}>
      <motion.section
        id="cover-section"
        className="h-screen relative"
        style={{
          backgroundImage: `url(${coupleImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1
              className="text-8xl font-bold mb-4"
              style={{ fontFamily: 'LovedbytheKingRegular' }}
            >
              Riccardo & Chiara
            </h1>
            <h2 className="text-3xl font-medium">7 settembre 2024</h2>
          </div>
        </div>
      </motion.section>

      <Container>
        {/* Rest of the content */}
        <motion.section
          id="when-and-where-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-3xl font-bold mb-4">Dove e Quando</h2>
          <p className="text-lg">Data e Ora del Matrimonio</p>
        </motion.section>

        {/* Add other sections here */}
      </Container>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Wedding Riccardo & Chiara</title>
