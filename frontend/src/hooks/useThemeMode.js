import { useState, useEffect } from 'react';
import { themes } from '@/styles/themes'; 

export const useThemeMode = () => {
  const [theme, setTheme] = useState(themes.light);
  const [themeName, setThemeName] = useState('light');

  useEffect(() => {
    const savedThemeName = localStorage.getItem('theme') || 'light';
    if (themes[savedThemeName]) {
      setTheme(themes[savedThemeName]);
      setThemeName(savedThemeName);
    } else {
      // fallback
      setTheme(themes.light);
      setThemeName('light');
    }
  }, []);

  const changeTheme = (newThemeName) => {
    if (themes[newThemeName]) {
      setTheme(themes[newThemeName]);
      setThemeName(newThemeName);
      localStorage.setItem('theme', newThemeName);
    }
  };

  return { theme, themeName, changeTheme };
};
