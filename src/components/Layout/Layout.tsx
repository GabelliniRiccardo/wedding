// Layout.tsx
import React, { Fragment, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { createTheme, ThemeProvider } from '@mui/material'
import theme from 'tailwindcss/defaultTheme'

// Define your custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ffd284',
      contrastText: '#3b3b3b',
    },
  },
})

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
        key="layout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="h-full"
      >
        <ThemeProvider theme={customTheme}>
          {showNavbar && <Navbar />}
          <main className={`min-h-full`}>{children}</main>
          <Footer />
        </ThemeProvider>
      </motion.div>
    </AnimatePresence>
  )
}

export default Layout
