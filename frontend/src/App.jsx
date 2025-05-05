import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { useThemeMode } from '@/hooks/useThemeMode'

// Layout
import Layout from '@/components/layout/Layout'

// Visitor Pages
import Home from '@/pages/visitor/Home'
import Products from '@/pages/visitor/Products'
import ProductDetail from '@/pages/visitor/ProductDetail'
import About from '@/pages/visitor/About'
import Contact from '@/pages/visitor/Contact'

// User Pages
import Cart from '@/pages/user/Cart'
import Account from '@/pages/user/Account'

// Admin Pages
import Dashboard from '@/pages/admin/Dashboard'

function App() {
  const { theme, changeTheme } = useThemeMode()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route element={<Layout changeTheme={changeTheme} />}>
            {/* Visitor Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* User Routes */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
