import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Arial', sans-serif;
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.25s linear;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    cursor: pointer;
  }
`

