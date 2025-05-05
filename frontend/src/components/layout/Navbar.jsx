import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
`

const LanguageSwitcher = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ThemeSwitcher = styled.div`
  margin-left: 1rem;
`

const Navbar = ({ changeTheme }) => {
  const { t, i18n } = useTranslation('navbar')

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Nav>
      <NavList>
        <li>
          <Link to="/">{t('home')}</Link>
        </li>
        <li>
          <Link to="/products">{t('products')}</Link>
        </li>
        <li>
          <Link to="/about">{t('about')}</Link>
        </li>
        <li>
          <Link to="/contact">{t('contact')}</Link>
        </li>
      </NavList>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LanguageSwitcher>
          <button onClick={() => handleLanguageChange('en')}>EN</button>
          <button onClick={() => handleLanguageChange('de')}>DE</button>
        </LanguageSwitcher>
        <ThemeSwitcher>
          <select
            onChange={(e) => changeTheme(e.target.value)}
            defaultValue={localStorage.getItem('theme') || 'light'}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="retro">Retro</option>
          </select>
        </ThemeSwitcher>
      </div>
    </Nav>
  )
}

export default Navbar
