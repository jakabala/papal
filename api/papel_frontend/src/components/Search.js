import React, { Component } from "react";

export default class Search extends Component {
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
    return (
      <React.Fragment>
        {this.state.papers.slice(0, 10).map(item => (
          <div>
            <h2>{item.text}</h2>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
