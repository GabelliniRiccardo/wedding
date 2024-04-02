import * as React from 'react'
import { motion } from 'framer-motion'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout/Layout'
import coupleImg from '../images/couple.jpg'
import WhenAndWhere from '../components/WhenAndWhere/WhenAndWhere'
import HowToGiveUsAPresent from '../components/HowToGiveUsAPresent/HowToGiveUsAPresent'
import GoogleMaps from '../components/GoogleMaps/GoogleMaps'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout showNavbar={true}>
      <motion.section
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
            <h2 className="text-3xl font-medium">7 Settembre 2024</h2>
          </div>
        </div>
      </motion.section>
      <motion.section
        className=" inset-0 overflow-y-auto bg-cover bg-center"
        style={{
          backgroundImage: `url(${coupleImg})`,
        }}
      >
        <div className="container mx-auto my-8 px-1 px-md-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <WhenAndWhere />

            <div className="lg:col-start-2 lg:row-start-2">
              <GoogleMaps />
            </div>

            <div className="lg:row-start-3">
              <HowToGiveUsAPresent />
            </div>
          </div>
        </div>
      </motion.section>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Wedding Riccardo & Chiara</title>
