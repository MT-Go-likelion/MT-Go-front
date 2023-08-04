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

  .react-datepicker {
    border-radius: 20px;
  }

  .react-datepicker__input-container::before {
    display: inline-block;
    position: absolute;
    top: 7px;
    left: 7px;
    font-size: 1rem;
    color: #333;
  }
  .react-datepicker__navigation{
    top:12px;
  }
  .react-datepicker__navigation--next{
    right:10px;
  }
  .react-datepicker__navigation--previous {
    left: 10px;
  }
  .react-datepicker__month-container{
    padding:0.5rem 1rem 1rem 1rem;
  }
  .react-datepicker__header {
    background-color: #fff;
    padding: 10px 0;
  }
  .react-datepicker__current-month{
    margin-bottom:1.1rem;
  }
    `;

export default GlobalStyles;
