import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { useThemeMode } from '@/hooks/useThemeMode';

// Layout
import Layout from '@/components/layout/Layout';

// Visitor Pages
import Home from '@/pages/visitor/Home';
import Products from '@/pages/visitor/Products';
import ProductDetail from '@/pages/visitor/ProductDetail';
import About from '@/pages/visitor/About';
import Contact from '@/pages/visitor/Contact';

// User Pages
import Cart from '@/pages/user/Cart';
import Account from '@/pages/user/Account';

// Admin Pages
import Dashboard from '@/pages/admin/Dashboard';

// Auth Pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPassword from '@/pages/auth/ResetPassword';
import ChangePasswordPage from '@/pages/auth/ChangePasswordPage';
import LogoutPage from '@/pages/auth/LogoutPage';

function App() {
  const { theme, changeTheme } = useThemeMode();

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

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
