import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    -webkit-font-smoothing: antialiased
  }
  body, input, button {
    font: 16px "Poppins", sans-serif;
  }
  button {
    cursor: pointer;
  }
  a{
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
    transition: 0.2s;

    &:hover{
      color: ${(props) => props.theme.colors.green1};
    }
  }

  label[role='alert']{
    color: #f74141;
  }


  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {

  }
  
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.text1}; 
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.gray3};
  }
`;
