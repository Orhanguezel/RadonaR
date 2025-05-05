import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = ({ changeTheme }) => {
  return (
    <>
      <Navbar changeTheme={changeTheme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
