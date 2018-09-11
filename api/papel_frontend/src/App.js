import React, { Component } from "react";
import "./App.css";

import Main from "./components/Main.js";
import Search from "./components/Search.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
        <Search />
      </div>
    );
  }
}

export default App;
