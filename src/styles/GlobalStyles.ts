"use client"
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.lightGray2};
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.gray};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.darkBlue};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
