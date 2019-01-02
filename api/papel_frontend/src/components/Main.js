import React, { Component } from "react";

export default class Main extends Component {
  state = {
    papers: [],
    value: ""
  };

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:8000/api/papers/");
      const papers = await res.json();
      this.setState({
        papers
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = event => {
    let titleArray = [];
    // let splitSearchValue = "";
    // console.log(this.state.papers);

    for (let i = 0; i < this.state.papers.length; i++) {
      titleArray.push(this.state.papers[i].title);
      console.log(titleArray);
      // if (this.state.value.includes(" ")) {
      //   console.log(this.state.value.split(" "));
      //   alert(this.state.value.join(" "));
      //   splitSearchValue = this.state.value.split(" ");
      // }

      var search = titleArray.find(a => a.includes(this.state.value));
      console.log(this.state.value);
      // console.log(splitSearchValue);
      console.log(search);
    }

    event.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <h1>Test Data</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:{" "}
            <input
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Search for stuff here"
              type="text"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {this.state.papers.slice(0, 10).map(item => (
          <div key={item.text}>
            <h2>{item.text}</h2>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
