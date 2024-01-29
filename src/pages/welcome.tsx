// src/components/Welcome.js
import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import { useLocation } from '@reach/router'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Layout from '../components/Layout/Layout'

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

  return (
    <Layout showNavbar={false}>
      <Container>
        {usernames.length && (
          <div className="h-screen flex mt-40 sm:mt-0 items-start sm:items-center justify-center text-center">
            <Typography
              component="h1"
              variant="h1"
              style={{ fontFamily: 'LovedbytheKingRegular' }}
            >
              <div className="flex flex-col justify-end">
                <TypeAnimation
                  style={{
                    whiteSpace: 'pre-line',
                    display: 'block',
                  }}
                  sequence={[generateWelcomeMessage()]}
                  wrapper="div"
                  speed={20}
                  repeat={0}
                  cursor={false}
                />
              </div>
            </Typography>
          </div>
        )}
      </Container>
    </Layout>
  )
}

export default Welcome
