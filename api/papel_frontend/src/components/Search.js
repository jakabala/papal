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
    selectValue: "",
    searchValues: [],
    checked: false,
    textBoolean: false,
    filtered: false,
    firstCheckBoxValue: "",
    papers: [],
    testValues: []
  };

  titles = [];
  years = [];
  receipients = [];

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

  handleText = event => {
    this.setState({ textBoolean: true });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = event => {
    if (this.state.value.includes("AND")) {
      let splitAND = this.state.value.split("AND");
      this.state.value = splitAND[0] + splitAND[1];
      fetch("http://localhost:8000/api/papers/?search=" + this.state.value)
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          this.setState({ searchValues: myJson });
          return this.state.searchValues;
        });
      console.table(this.state.testValues);
    }

    if (this.state.value.includes("OR")) {
      let splitOR = this.state.value.split("OR");
      for (let i = 0; i < this.state.papers.length; i++) {
        if (
          this.state.papers[i].text.includes(splitOR[0]) ||
          (this.state.papers[i].title.includes(splitOR[0]) &&
            !this.state.testValues.includes(this.state.papers[i]))
        ) {
          this.state.testValues.push(this.state.papers[i]);
        }
        if (
          this.state.papers[i].text.includes(splitOR[1]) ||
          this.state.papers[i].title.includes(splitOR[1])
        ) {
          this.state.testValues.push(this.state.papers[i]);
        }
      }
      console.table(this.state.testValues);
    }
    if (this.state.value.includes("NOT")) {
      let splitNOT = this.state.value.split("NOT");
      //Add inclusion of title array
      for (let i = 0; i < this.state.papers.length; i++) {
        if (
          (this.state.papers[i].text.includes(splitNOT[0]) &&
            !this.state.papers[i].text.includes(splitNOT[1])) ||
          (this.state.papers[i].title.includes(splitNOT[0]) &&
            !this.state.papers[i].title.includes(splitNOT[1])) ||
          (this.state.papers[i].text.includes(splitNOT[0]) &&
            !this.state.papers[i].title.includes(splitNOT[1])) ||
          (this.state.papers[i].title.includes(splitNOT[0]) &&
            !this.state.papers[i].text.includes(splitNOT[1]))
        ) {
          this.state.testValues.push(this.state.papers[i]);
        }
      }
      console.table(this.state.testValues);
    }

    if (this.state.value.includes("NEAR")) {
      //First Word
      let splitNEAR = this.state.value.split("NEAR");
      //Number
      let splitNEAR2 = splitNEAR[1][0];
      //Last Word
      let newSplit = splitNEAR[1].split(" ");
      //TODO allow multiple digits
      //TODO characters to words


      for (let i = 0; i < this.state.papers.length; i++) {

        if (
          this.state.papers[i].text.includes(splitNEAR[0]) &&
          this.state.papers[i].text.includes(newSplit[1])
        ) {
          this.state.papers[i].text.split(" ")
          console.log(this.state.papers[i].text.split(" ").indexOf(newSplit[1]))
          console.log(this.state.papers[i].text.split(" ").indexOf(splitNEAR[0]))
          console.log(this.state.papers[i].text.split(" ")[3])
          console.log(this.state.papers[i].text.split(" ")[218])

          if (
            this.state.papers[i].text.indexOf(newSplit[1]) >
            this.state.papers[i].text.indexOf(splitNEAR[0])
          ) {
            this.state.papers[i].text.indexOf(splitNEAR[1]) -
              this.state.papers[i].text.indexOf(newSplit[0]);
          }
          if (
            this.state.papers[i].text.indexOf(newSplit[1]) <
            this.state.papers[i].text.indexOf(splitNEAR[0])
          ) {
            this.state.papers[i].text.indexOf(splitNEAR[0]) -
              this.state.papers[i].text.indexOf(newSplit[1]);
            if (
              this.state.papers[i].text.indexOf(splitNEAR[0]) -
                this.state.papers[i].text.indexOf(newSplit[1]) <=
              newSplit[0]
            ) {
              console.log(
                this.state.papers[i].text.indexOf(splitNEAR[0]) -
                  this.state.papers[i].text.indexOf(newSplit[1]) <=
                  newSplit[0]
              );
            }
            if (
              this.state.papers[i].text.indexOf(splitNEAR[0]) -
                this.state.papers[i].text.indexOf(newSplit[1]) >
              newSplit[0]
            ) {
              alert(this.state.papers[i].text.indexOf(splitNEAR[0]) -
                this.state.papers[i].text.indexOf(newSplit[1]))

              alert("No results found.");
            }
          }

          //find the index of first split value
          //numerical value used as index distance from the second split value
          //subtract the index values of the two and get all index values of those numbers in between

        }
      }
      // event.preventDefault();
      console.table(this.state.testValues);
    } else {
      fetch("http://localhost:8000/api/papers/?search=" + this.state.value)
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          this.setState({ searchValues: myJson });
          return this.state.searchValues;
        });
    }
    event.preventDefault();
  };

  handleFilter = () => {
    console.log(
      this.state.searchValues.map(
        item => (
          console.log(item.title),
          (item.title = item.title + "1"),
          console.log(item.title)
        )
      )
    );
    if (this.state.filtered === false) {
      for (var i = 0; i < this.state.searchValues.length; i++) {
        this.titles.push(this.state.searchValues[i].title);
        this.years.push(this.state.searchValues[i].year);
        this.receipients.push(this.state.searchValues[i].receipient);
      }
      console.log(this.titles.sort());
      this.setState({ filtered: true });
    } else if (this.state.filtered === true) {
      console.log(this.titles.reverse());
      this.titles.length = 0;
      this.setState({ filtered: false });
    }
  };

  render() {
    const filterTitle = this.state.filtered
      ? "Descending Filter Title"
      : "Ascending Filter Title";

    return (
      <div>
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:{" "}
            <input
              name="searchBox"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Search for stuff here"
              type="text"
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        <div>
          <h1>Test Values</h1>
          {this.state.testValues.map(paper => (
            <div key={paper.id}>
              <h1>{paper.title}</h1>
              <p>{paper.text}</p>
            </div>
          ))}
        </div>

        {this.state.searchValues.length > 0 && (
          <React.Fragment>
            <h2>Results: {this.state.searchValues.length}</h2>
            <button type="submit" onClick={this.handleFilter}>
              {filterTitle}
            </button>
          </React.Fragment>
        )}

        {this.state.searchValues.map((item, i) => (
          <div className="searchResults" key={i}>
            <p>
              <strong>
                <u>{i + 1}</u>
              </strong>
            </p>
            <img src={item.image_one} />
            <p>
              <strong>
                <u>Title:</u>
              </strong>{" "}
              {item.title}
            </p>
            <p>
              <strong>
                <u>Author:</u>
              </strong>{" "}
              {item.sender}
            </p>
            <p>
              <strong>
                <u>Receipient:</u>
              </strong>{" "}
              {item.receipient}
            </p>
            <p>
              <strong>
                <u>Year:</u>
              </strong>{" "}
              {item.year}
            </p>
            {this.state.textBoolean === true && (
              <p>
                <strong>
                  <u>Text:</u>
                </strong>{" "}
                {item.text}
              </p>
            )}
            {this.state.textBoolean === false && (
              <button onClick={this.handleText}>Text</button>
            )}
          </div>
        ))}
      </div>
    );
  }
}
