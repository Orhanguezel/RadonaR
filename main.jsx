// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import './i18n.js'; // <--- CAŁKOWICIE USUNIĘTY LUB ZAKOMENTOWANY TEN IMPORT

import App from './App.jsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme.js';
import GlobalStyles from './styles/GlobalStyles.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);