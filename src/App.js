import React from "react";
import { createGlobalStyle } from "styled-components";
import { Window } from "./components/Window";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background-color: #F7F7F7;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
    user-select: none;
  }
`;

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <Window />
  </React.Fragment>
);

export { App };
