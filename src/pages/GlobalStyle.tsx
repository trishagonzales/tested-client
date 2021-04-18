import { createGlobalStyle } from 'styled-components';
import { theme, colors } from '../theme';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Theme */
    --main: ${theme.main};
    --main2: ${theme.main2};
    --accent: ${theme.accent};
    --fg: ${theme.fg};
    --fg2: ${theme.fg2};
    --bg: ${theme.bg};
    --error: ${theme.error};
    --lightgrey: ${colors.lightGrey};
    --grey: ${colors.grey};
    --darkgrey: ${colors.darkGrey};

    /* Border */
    --borderRadius: 5px;

    /* Card box shadow */
    --cardBoxShadow: 1px 3px 10px #d0d0d0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  li {
    list-style-type: none;
  }

  a {
    color: ${theme.fg};
    text-decoration: none;
  }

  html {
    scroll-behavior: smooth;
  }
  
  body {
    overflow: overlay;
    overflow-x: hidden;
    font-family: Roboto, 'sans-serif';
    font-size: 16px;
  }

  button, input, textarea {
    border: none;
    :focus {
      outline: none;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Poppins;
    color: var(--main);
  }

  .hoverable {
    cursor: pointer;
    :hover {
      filter: brightness(97%);
    }
  }
  .hoverable-text {
    cursor: pointer;
    :hover {
      text-decoration: underline;
      filter: brightness(97%);
    }
  }
  .input-error {
    font-size: 12px;
    color: red;
  }
  .error-color {
    color: var(--error);
  }
  .white-color {
    color: white;
  }
  .blue-color {
    color: #2f2fff;
  }
  .title-underline {
    width: 30px;
    height: 8px;
    display: block;
    border-radius: 5px;
    background: var(--main);
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 14px;
  }

  #content {
    min-height: calc(100vh - 120px - 55px);
  }

  #modal-root {
    .modal-container {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(4px);
      z-index: 100;
    }
  }
`;
