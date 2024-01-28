// Navbar.tsx
import React, { Fragment, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Link as ScrollLink } from 'react-scroll'

interface MenuItem {
  label: string
  target: string
}

const menuItems: MenuItem[] = [
  { label: 'Dove e Quando', target: 'when-and-where-section' },
  { label: 'Come darci un regalo', target: 'how-to-contribute' },
  { label: 'Conferma', target: 'confirm-section' },
]

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleMenuToggle = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar className="flex-grow-1 flex justify-between items-center">
          <h1>Riccardo & Chiara</h1>
          {!isMobile && (
            <div className="flex justify-center items-center gap-4">
              {menuItems.map((item, index) => (
                <ScrollLink
                  to={item.target}
                  smooth={true}
                  offset={-70} // Adjust the offset as needed
                  duration={500}
                  key={index}
                  spy={true}
                  activeClass="active"
                >
                  <span className="cursor-pointer">{item.label}</span>
                </ScrollLink>
              ))}
            </div>
          )}
          {isMobile && (
            <div className="ml-auto">
              <IconButton
                edge="end"
                color="inherit"
                aria-label={menuOpen ? 'close menu' : 'menu'}
                onClick={handleMenuToggle}
                ref={anchorRef}
                style={{
                  transition: 'transform 0.3s',
                  transform: `rotate(${menuOpen ? '0deg' : '180deg'})`,
                }}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </div>
          )}
        </Toolbar>
        <AnimatePresence>
          {menuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex w-full rounded-b"
              style={{
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              <Container>
                <div className="flex flex-col gap-2">
                  {menuItems.map((item, index) => (
                    <ScrollLink
                      key={index}
                      className="py-2 cursor-pointer"
                      onClick={() => {
                        handleMenuClose()
                      }}
                      to={item.target}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      spy={true}
                      activeClass="active"
                    >
                      {item.label}
                    </ScrollLink>
                  ))}
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </AppBar>
    </Fragment>
  )
}

export default Navbar
