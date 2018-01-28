import React, { Component } from 'react';
import './App.css';

class SearchForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.newQuery}>
        <input type="text" value={this.props.value} onChange={this.props.handleWriting} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
class TableRow extends Component {
  render() {
    let d = this.props.data
    return (
      <tr>
        <td>{d.poster_path}</td><td>{d.title}</td>
        <td>{d.release_date}</td><td>{d.popularity}</td>
        <td>{d.vote_count}</td><td>{d.vote_average}</td>
        <td>+</td>
      </tr>
    )

  }
}
class Results extends Component {
  constructor() {
    super()
    this.state = {
      sorting: "default"
    }
    this.handleClickSort = this.handleClickSort.bind(this)
  }

  handleClickSort() {
    //on click toggle between 3 values
    if (this.state.sorting === "default") {
      this.setState({sorting: "ascending"})
    }
    else if (this.state.sorting === "ascending") {
      this.setState({sorting: "descending"})
    }
    else if (this.state.sorting === "descending") {
      this.setState({sorting: "default"})
    }
  }

  render() {
    const sortSymbol = {
      ascending: "Title ▲",
      descending: "Title ▼",
      default: "Title ▶"
    }

    let data = this.props.content.results

    if (this.state.sorting === "default") {
      //default is from most popular to least popular.
      data.sort((a, b) => b.popularity - a.popularity)
    }

    if (this.state.sorting === "ascending") {
      data.sort((a, b) => {
        if (a.title < b.title) {
          return -1
        }
        if (a.title > b.title) {
          return 1
        }
        else {
          return 0
        }
      })
    }

    if (this.state.sorting === "descending") {
      data.sort((a, b) => {
        if (a.title > b.title) {
          return -1
        }
        if (a.title < b.title) {
          return 1
        }
        else {
          return 0
        }
      })
    }

    console.log(data[0])
    let rows = data.map((d, i) => <TableRow data={d} key={i}/>)
    return (
      <table>
        <tbody>
        <tr>
          <th>Poster</th><th onClick={this.handleClickSort}>{sortSymbol[this.state.sorting]}</th>
          <th>Release date</th><th>Popularity</th>
          <th>Vote count</th><th>Vote avg.</th>
        </tr>
        {rows}
        </tbody>
      </table>
  )
  }
}

class Wait extends Component {
  // Displayed during API call
  render() {
    return <div className="loader"></div>
  }
}


class App extends Component {
  constructor() {
    super()
    this.state = {
      result: "default",
      formInput: ""
      }
    this.clearState = this.clearState.bind(this)
    this.newQuery = this.newQuery.bind(this)
    this.handleWriting = this.handleWriting.bind(this)
  }
  clearState() {
    this.setState({
      result: "",
      formInput: ""
    })
  }

  handleWriting(e) {
    this.setState({formInput: e.target.value})
  }

  newQuery(e) {
    this.clearState()
    e.preventDefault()
    let query = encodeURIComponent(this.state.formInput)
    let url = 'https://api.themoviedb.org/3/search/movie?api_key=9105463e0cea93a221ef547caa1ba212&query=' + query
    fetch(url, {
    	method: 'GET'})
    .then(
      (response) => {return response.json()} )
    .then(
      (data) => {this.setState({result: data})} )
  }


  render() {
    let display
    if (this.state.result === 'default') {
      display = <p>Welcome to starting page, you can do many things here! Please enjoy this enormous opportunity to grow professionally as well as spiritually</p>
    }
    else {
      display = this.state.result ? <Results content={this.state.result} /> : <Wait />
    }
    return (
      <div className="App">
        <SearchForm value={this.state.formInput} newQuery={this.newQuery} handleWriting={this.handleWriting} />
        {display}
      </div>
    );
  }
}

export default App;