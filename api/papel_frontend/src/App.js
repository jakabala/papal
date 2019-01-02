import React, { Component } from "react";
import "./App.css";

import Main from "./components/Main";
import Search from "./components/Search";
import Inputs from "./components/Inputs";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />

        <hr />
      </div>
    );
  }
}

export default App;
