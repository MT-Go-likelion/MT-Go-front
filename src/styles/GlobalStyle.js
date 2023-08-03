import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
body {
  width: 100%;
	height: 100%;
}

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    background: inherit;
    border: none;
  }

  textarea {
    resize: none;
  }

  textarea:focus {
    outline: none;
  }
    `;

export default GlobalStyles;
