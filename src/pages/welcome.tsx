// src/components/Welcome.js
import React, { useEffect, useState } from 'react'
import { Container, CssBaseline, Typography } from '@mui/material'
import { useLocation } from '@reach/router' // Import useLocation from @reach/router
import Layout from '../components/Layout/Layout'
import { TypeAnimation } from 'react-type-animation'

const Welcome = () => {
  const location = useLocation() // Use useLocation from @reach/router
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

    return `Ciao ${usernames.join(', ')},`
  }

  return (
    <Layout>
      <Container>
        <div className="h-screen flex items-center justify-center text-center">
          <Typography
            component="h1"
            variant="h1"
            style={{ fontFamily: 'LovedbytheKingRegular' }}
          >
            {usernames.length && (
              <div className="flex flex-col justify-end">
                <TypeAnimation
                  sequence={[generateWelcomeMessage()]}
                  wrapper="div"
                  speed={20}
                  repeat={0}
                  cursor={false}
                />
                <TypeAnimation
                  sequence={['Benvenuti!']}
                  wrapper="div"
                  speed={20}
                  repeat={0}
                  cursor={false}
                />
              </div>
            )}
          </Typography>
        </div>
      </Container>
    </Layout>
  )
}

export default Welcome
