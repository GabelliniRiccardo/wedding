import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from '@reach/router'
import { motion, useInView } from 'framer-motion'
import Layout from '../components/Layout/Layout'
import { TypeAnimation } from 'react-type-animation'
import { ArrowDownwardSharp } from '@mui/icons-material'

import rings from '../images/rings.jpg'
import handToHand from '../images/photograph/hand_to_hand.jpg'
import { type HeadFC, Link } from 'gatsby'
import { Button } from '@mui/material'
import { variants } from '../constants'

const writingSpeed = 20

const Welcome = () => {
  const location = useLocation()
  const [usernames, setUsernames] = useState<string[]>([])
  const [sexType, setSexType] = useState<'m' | 'f' | null>(null)
  const weMarryElementRef = useRef(null)
  const isWeMarryInView = useInView(weMarryElementRef, {
    margin: '0px 0px -60% 0px',
    once: true,
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const usernamesParam = searchParams.get('usernames')
    const sexParam = searchParams.get('s')

    if (sexParam === 'm' || sexParam === 'f') {
      setSexType(sexParam)
    } else {
      setSexType(null)
    }

    if (usernamesParam) {
      const parsedUsernames = usernamesParam.split(',')
      setUsernames(parsedUsernames)
    }
  }, [location.search])

  useEffect(() => {
    console.log('is in view: ', isWeMarryInView)
  }, [isWeMarryInView])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const generateWelcomeMessage = () => {
    if (usernames.length === 0) {
      throw new Error('Usernames are not defined!')
    }

    if (usernames.length === 1) {
      const [firstName] = usernames[0].split(' ')
      return `Ciao ${firstName},\nBenvenut${generateMaleOrFEmaleOrNonBinaryWord()}`
    }

    const processedUsernames = usernames.map((username) => {
      const [firstName] = username.split(' ')
      return firstName
    })

    const lastUsername = processedUsernames.pop()
    const firstNamesJoin = processedUsernames.join(', ')

    return `Ciao ${firstNamesJoin} e ${lastUsername},\n\nBenvenuti!`
  }

  function generateMaleOrFEmaleOrNonBinaryWord(): 'o' | 'a' | '*' {
    if (sexType === 'm') {
      return 'o'
    } else if (sexType === 'f') {
      return 'a'
    } else {
      return '*'
    }
  }

  return (
    <Layout showNavbar={false}>
      <div className="h-full flex flex-col sm:mt-0 items-center justify-center text-center">
        {usernames.length && (
          <div
            className="relative w-full px-2"
            style={{
              backgroundImage: `url(${rings})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-opacity-50 bg-white"></div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ ease: 'easeIn', duration: 0.8 }}
              className="flex flex-col justify-center items-center min-h-screen w-full"
            >
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
          </div>
        )}

        {!isWeMarryInView && (
          <ArrowDownwardSharp
            className="fixed h-64 bottom-0 animate-bounce text-center"
            fontSize="large"
          />
        )}

        <div
          className="relative w-full"
          style={{
            backgroundImage: `url(${handToHand})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-opacity-25 bg-white"></div>
          <motion.div
            ref={weMarryElementRef}
            initial={{ opacity: 0 }}
            animate={isWeMarryInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="flex flex-col justify-center items-center min-h-screen w-full"
          >
            {isWeMarryInView && (
              <div className="z-50 flex flex-col gap-40">
                <TypeAnimation
                  style={{
                    whiteSpace: 'pre-line',
                    fontFamily: 'LovedbytheKingRegular',
                  }}
                  className="text-7xl"
                  sequence={['Finalmente ci sposiamo!']}
                  wrapper="div"
                  speed={writingSpeed}
                  repeat={0}
                  cursor={false}
                />
                <Link
                  to={`/?participants=${encodeURIComponent(usernames.join(','))}`}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      fontSize: 33,
                    }}
                  >
                    Dettagli
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Welcome

export const Head: HeadFC = () => (
  <head>
    <title>Wedding Riccardo & Chiara</title>
  </head>
)
