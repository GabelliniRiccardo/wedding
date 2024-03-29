import React, { Fragment, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Link as ScrollLink } from 'react-scroll'

const menuItems = [
  { label: 'Dove e Quando', target: 'when-and-where-section' },
  { label: 'Come darci un regalo', target: 'how-to-give-us-a-present-section' },
  { label: 'Conferma', target: 'confirm-presence-section' },
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
      <AppBar position="sticky">
        <Toolbar className="flex justify-between items-center">
          <Typography variant="h4" fontFamily="LovedbytheKingRegular">
            Riccardo & Chiara
          </Typography>
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
                  <Typography
                    variant="subtitle1"
                    className="cursor-pointer"
                    fontFamily="MenuFont"
                  >
                    {item.label}
                  </Typography>
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
                      className="py-2 cursor-pointer text-right"
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
                      <Typography variant="subtitle1" fontFamily="MenuFont">
                        {item.label}
                      </Typography>
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
