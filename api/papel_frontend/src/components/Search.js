import React, { Component } from "react";

export default class Search extends Component {
  state = {
    value: "",
    searchValues: []
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleNext = myJson => {
    this.setState({ searchValues: myJson });

    return this.state.searchValues;
  };

  handleSubmit = event => {
    fetch("http://localhost:8000/api/papers/?search=" + this.state.value)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.handleNext(myJson);
        return myJson;
      });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:
            <input
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Search for stuff here"
              type="text"
            />
          </label>
          <label>
            Parameter 1
            <input type="checkbox" />
          </label>
          <label>
            Parameter 2
            <input type="checkbox" />
          </label>
          <label>
            Parameter 3
            <input type="checkbox" />
          </label>
          <label>
            Parameter 4
            <input type="checkbox" />
          </label>
          <button type="submit">Submit</button>
        </form>

        {this.state.searchValues.map(item => (
          <div key={item.text}>
            <p>{item.text}</p>
          </div>
        ))}

        {this.state.value.length > 0 && (
          <h2>
            As soon as you type I should appear and when you don{"'"}t type
            anything you won{"'"}t see me!{" "}
          </h2>
        )}
      </div>
    );
  }
}
