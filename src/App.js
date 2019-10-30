import React, { Component } from 'react';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import { Window } from './Window';
import CustomEase from './Plugins/CustomEase';

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

export default class App extends Component {
  constructor() {
    super();
    CustomEase.create('Mo', '0.455, 0.03, 0.515, 0.955');
    // cubic-bezier(0.455, 0.03, 0.515, 0.955)
    // CustomEase.create('Mo', '0.64, 0.04, 0.35, 1');
  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Window />
      </React.Fragment>
    );
  }
}
