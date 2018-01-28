import React, { Component } from 'react';
import logo from './logo.svg';
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
  render() {
    let rows = this.props.content.results.map((d, i) => <TableRow data={d} key={i}/>)
    return (
      <table>
        <tbody>
        <tr>
          <th>Poster</th><th>Title</th>
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
