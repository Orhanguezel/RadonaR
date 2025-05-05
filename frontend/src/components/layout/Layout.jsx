import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children, changeTheme }) => {
  return (
    <>
      <Navbar changeTheme={changeTheme} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
