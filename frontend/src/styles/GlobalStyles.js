import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.colors.background}; 
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.25s linear, color 0.25s linear;
    min-height: 100vh; 

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link || theme.colors.text};
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary || theme.colors.text};
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }
`

