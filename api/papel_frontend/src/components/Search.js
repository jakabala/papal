import React, { Component } from "react";
import "./Search.css";

class CheckBox extends Component {
  render() {
    return (
      <div className="checkBox">
        <label>
          {this.props.label}
          <input
            id={this.props.id}
            value={this.props.value}
            type="checkbox"
            onClick={this.props.onClick}
            checked={this.props.checked}
          />
        </label>
      </div>
    );
  }
}
export default class Search extends Component {
  state = {
    value: "",
    searchValues: [],
    checked: false,
    firstCheckBoxValue: "",
    secondCheckBoxValue: ""
  };

  firstCheckBoxRef = React.createRef();
  secondCheckBoxRef = React.createRef();

  handleCheck = () => {
    if (
      this.state.checked === false &&
      this.firstCheckBoxRef.current.props.id === "first"
    ) {
      this.setState({ checked: true });
      this.setState({ firstCheckBoxValue: 1900 });
    } else if (
      this.state.checked === true &&
      this.firstCheckBoxRef.current.props.id === "first"
    ) {
      this.setState({ checked: false });
      this.setState({ firstCheckBoxValue: "" });
    }
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = event => {
    fetch(
      "http://localhost:8000/api/papers/?search=" +
        this.state.value +
        "+" +
        this.state.firstCheckBoxValue
    )
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({ searchValues: myJson });
        return this.state.searchValues;
      });
    event.preventDefault();
  };

  render() {
    console.log(this.state.checked);
    console.log(this.props);

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

          {this.state.value.length > 0 && (
            <CheckBox
              ref={this.firstCheckBoxRef}
              id="first"
              label="1900"
              value={this.state.firstCheckBoxValue}
              onClick={this.handleCheck}
            />
          )}
          <button type="submit">Submit</button>
        </form>

        {this.state.searchValues.map(item => (
          <div key={item.text}>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    );
  }
}
