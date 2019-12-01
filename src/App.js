import React, { Component } from "react";
import "./App.css";
import { createGlobalStyle } from "styled-components";
import { Window } from "./components/Window";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background-color: #F7F7F7;
  }

  * {
    box-sizing: border-box;
  }
`;

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <Window />
  </React.Fragment>
);

export { App };
