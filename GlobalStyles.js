// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Upewnij się, że tutaj NIE MA linii zaczynających się od @import url(...) */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "PP Neue Montreal", sans-serif; /* Ten font jest ładowany przez <link> w index.html */
    background-color: ${({ theme }) => theme.colors.primary || '#0a0a0a'};
    color: ${({ theme }) => theme.colors.text || '#fff'};
    overflow-x: hidden; /* Zapobiega poziomemu scrollowi */
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    line-height: 1.2;
  }

  @keyframes spin { /* Definicja animacji spin dla spinnera loadera */
    to {
      transform: rotate(360deg);
    }
  }
`;

export default GlobalStyles;
