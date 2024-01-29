// src/components/Welcome.js
import React, { useEffect, useState } from 'react'
import { Container, CssBaseline, Typography } from '@mui/material'
import { useLocation } from '@reach/router'
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
      return 'No usernames found in the query parameters.'
    }

    return `Hello ${usernames.join(', ')}, welcome to our wedding!`
  }

  return (
    <Layout>
      <div className="h-screen flex items-center justify-center">
        <Typography component="h1" variant="h5">
          {generateWelcomeMessage()}
        </Typography>
      </div>
    </Layout>
  )
}

export default Welcome
