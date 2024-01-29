// src/components/Welcome.js
import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import { useLocation } from '@reach/router'
import { motion } from 'framer-motion'
import Layout from '../components/Layout/Layout'
import { navigate } from 'gatsby'
import { TypeAnimation } from 'react-type-animation'

const writingSpeed = 20

const Welcome = () => {
  const location = useLocation()
  const [usernames, setUsernames] = useState<string[]>([])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const usernamesParam = searchParams.get('usernames')

    if (usernamesParam) {
      const parsedUsernames = usernamesParam.split(',')
      setUsernames(parsedUsernames)
    }
  }, [location.search])

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
      navigate('/')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [usernames.length])

  return (
    <Layout showNavbar={false}>
      {usernames.length && (
        <div className="h-full overflow-y-scroll flex flex-col mt-40 sm:mt-0 items-start sm:items-center justify-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ease: 'easeOut', duration: 0.8 }}
            className="flex flex-col justify-center h-screen"
          >
            <TypeAnimation
              style={{
                whiteSpace: 'pre-line',
                fontFamily: 'LovedbytheKingRegular',
              }}
              className="text-7xl"
              sequence={[generateWelcomeMessage()]}
              wrapper="div"
              speed={writingSpeed}
              repeat={0}
              cursor={false}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ease: 'easeOut', duration: 0.8 }}
            className="flex flex-col justify-center h-screen"
          >
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
          </motion.div>
        </div>
      )}
    </Layout>
  )
}

export default Welcome
