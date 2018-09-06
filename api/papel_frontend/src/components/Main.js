import React, { Component } from "react";

export default class Main extends Component {
  state = {
    papers: []
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

  render() {
    console.log(this.state.papers);
    return (
      <React.Fragment>
        <h1>Test Data</h1>
        {this.state.papers.slice(0, 10).map(item => (
          <div key={item.text}>
            <h2>{item.text}</h2>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
