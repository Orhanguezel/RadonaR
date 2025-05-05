import { useState, useEffect } from 'react'
import { themes } from '@/styles/theme'

export const useThemeMode = () => {
  const [theme, setTheme] = useState(themes.light)

  useEffect(() => {
    const savedThemeName = localStorage.getItem('theme') || 'light'
    setTheme(themes[savedThemeName])
  }, [])

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setTheme(themes[themeName])
      localStorage.setItem('theme', themeName)
    }
  }

  return { theme, changeTheme }
}
