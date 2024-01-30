// src/components/Welcome.js
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from '@reach/router'
import { motion, useInView } from 'framer-motion'
import Layout from '../components/Layout/Layout'
import { TypeAnimation } from 'react-type-animation'
import { ArrowDownwardSharp } from '@mui/icons-material'

import rings from '../images/rings.jpg'

const writingSpeed = 20

const Welcome = () => {
  const location = useLocation()
  const [usernames, setUsernames] = useState<string[]>([])
  const weMarryElementRef = useRef(null)
  const isWeMarryInView = useInView(weMarryElementRef, {
    margin: '0px 0px -90% 0px',
    once: true,
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const usernamesParam = searchParams.get('usernames')

    if (usernamesParam) {
      const parsedUsernames = usernamesParam.split(',')
      setUsernames(parsedUsernames)
    }
  }, [location.search])

  useEffect(() => {
    console.log('is in view: ', isWeMarryInView)
  }, [isWeMarryInView])

  const generateWelcomeMessage = () => {
    if (usernames.length === 0) {
      throw new Error('Usernames are not defined!')
    }

    if (usernames.length === 1) {
      return `Ciao ${usernames[0]},\nBenvenuto`
    }

    const lastUsername = usernames[usernames.length - 1]
    const penultimateNames = usernames.slice(0, -1).join(', ')

    return `Ciao ${penultimateNames} e ${lastUsername},\nBenvenuti!`
  }

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const currentScroll = window.scrollY

    const isScrolledToBottom = currentScroll + windowHeight >= documentHeight

    if (isScrolledToBottom && usernames.length > 0) {
      // navigate('/')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [usernames.length])

  return (
    <Layout showNavbar={false}>
      <div className="h-full flex flex-col sm:mt-0 items-start sm:items-center justify-center text-center">
        {usernames.length && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ease: 'easeIn', duration: 0.8 }}
            className="flex flex-col justify-center items-center min-h-screen w-full"
            style={{
              backgroundImage: `url(${rings})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-opacity-50 bg-white"></div>
            <TypeAnimation
              style={{
                whiteSpace: 'pre-line',
                fontFamily: 'LovedbytheKingRegular',
              }}
              className="text-7xl z-50"
              sequence={[generateWelcomeMessage()]}
              wrapper="div"
              speed={writingSpeed}
              repeat={0}
              cursor={false}
            />
          </motion.div>
        )}

        {!isWeMarryInView && (
          <ArrowDownwardSharp
            className="fixed h-64 bottom-0 animate-bounce "
            fontSize="large"
          />
        )}

        <motion.div
          ref={weMarryElementRef}
          initial={{ opacity: 0 }}
          animate={isWeMarryInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="flex flex-col justify-center min-h-screen"
        >
          {isWeMarryInView && (
            <TypeAnimation
              style={{
                whiteSpace: 'pre-line',
                fontFamily: 'LovedbytheKingRegular',
              }}
              className="text-7xl"
              sequence={['Finalmente Ci Sposiamo!']}
              wrapper="div"
              speed={writingSpeed}
              repeat={0}
              cursor={false}
            />
          )}
        </motion.div>
      </div>
    </Layout>
  )
}

export default Welcome
