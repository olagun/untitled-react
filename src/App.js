import React, { Component } from "react";
import "./App.css";
import { createGlobalStyle } from "styled-components";
import { Window}  from "./Window";

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

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Window />
      </React.Fragment>
    );
  }
}

export default App;
