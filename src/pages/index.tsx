import * as React from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion' // Import useInView hook
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout/Layout'
import coupleImg from '../images/couple.jpg'
import WhenAndWhere from '../components/WhenAndWhere/WhenAndWhere'
import HowToGiveUsAPresent from '../components/HowToGiveUsAPresent/HowToGiveUsAPresent'
import RSVPForm from '../components/RSVPForm/RSVPForm'

const IndexPage: React.FC<PageProps> = () => {
  const whenAndWhereRef = useRef(null)
  const isWhenAndWhereInView = useInView(whenAndWhereRef, {
    margin: '0px 0px -60% 0px',
    once: true,
  })
  const howToGiveUsAPresentRef = useRef(null)
  const isHowToGiveUsAPresentView = useInView(howToGiveUsAPresentRef, {
    margin: '0px 0px -60% 0px',
    once: true,
  })
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

      <div className="container mx-auto my-8 px-1 px-md-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            ref={whenAndWhereRef}
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: isWhenAndWhereInView ? 1 : 0,
              x: isWhenAndWhereInView ? 0 : -100,
            }}
            transition={{ duration: 2.5 }}
          >
            <WhenAndWhere />
          </motion.div>

          <motion.div
            ref={howToGiveUsAPresentRef}
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: isHowToGiveUsAPresentView ? 1 : 0,
              x: isHowToGiveUsAPresentView ? 0 : 100,
            }}
            transition={{ duration: 2.5 }}
          >
            <HowToGiveUsAPresent />
          </motion.div>
        </div>
        <RSVPForm />
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Wedding Riccardo & Chiara</title>
