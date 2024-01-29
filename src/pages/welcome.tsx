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
      console.error('usernames not found!')
      return 'Hello'
    }

    return `Hello ${usernames.join(', ')},`
  }

  return (
    <Layout>
      <Container>
        <div className="h-screen flex items-center justify-center">
          <Typography
            component="h1"
            variant="h5"
            style={{ fontFamily: 'YourDesiredFont' }}
          >
            {usernames.length && (
              <TypeAnimation
                sequence={[
                  generateWelcomeMessage(),
                  1000,
                  'Welcome to our wedding!',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '2em', display: 'inline-block' }}
                repeat={Infinity}
              />
            )}
          </Typography>
        </div>
      </Container>
    </Layout>
  )
}

export default Welcome
