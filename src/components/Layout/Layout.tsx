// Layout.tsx
import React, { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { createTheme, ThemeProvider } from '@mui/material'
import type { HeadFC } from 'gatsby'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ffd284',
      contrastText: '#3b3b3b',
    },
  },
  typography: {
    fontFamily: 'TiltNeon-Regular',
  },
})

const transitionVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2.5,
    },
  },
}

const Layout: React.FC<{ children: ReactNode; showNavbar: boolean }> = ({
  children,
  showNavbar,
}: {
  children: ReactNode
  showNavbar: boolean
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key="page"
        initial="initial"
        animate="animate"
        variants={transitionVariants}
        style={{ width: '100%', height: '100%' }}
      >
        <ThemeProvider theme={customTheme}>
          {showNavbar && <Navbar />}
          <main className="min-h-full overflow-x-hidden">{children}</main>
          <Footer />
        </ThemeProvider>
      </motion.div>
    </AnimatePresence>
  )
}

export default Layout
