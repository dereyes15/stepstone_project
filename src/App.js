import React, { Component } from 'react';
import { searchFetch } from './API/tmdb-api.js';

class App extends Component {
  constructor(props){
    super(props)
    this.apiKey = "48999c48a091ec759860ba60cb88ab49";
    this.state = {
      query: "",
      resultsFetched: false,
      apiResults: []
    }
  }

  // Listens for a change in the input form and sets the state, "query", based on each keystroke.
  // Does not return a value
  setQueryState = (event) => {
    event.preventDefault();

    let { query } = this.state;
    let inputValue = event.target.value;

    query = inputValue;

    this.setState({ query });
  }

  //When user hits "Enter" key or clicks the "Search" button, a fetch request is sent the The Movie Database using the searchFetch function (as defined in './API/tmdb-api.js').
  // If the response is longer than 15 results, it will only display the results with a link to the movie poster_path.
  // If the response is less than 15 results, then it will take the first 10 results and display them, whether or not it has a poster_path.
  // The resultsFetched variable is set to true and the apiResults variable is also set.
  displaySearchResults = (event) => {
    event.preventDefault();

    let { query } = this.state;
    let fetchResponse = [];
    if(query !== ""){
      searchFetch(query).then(res => {
        fetchResponse = res;
        let slicedResponse = []

        if(fetchResponse.length > 15){
          for(let i=0; slicedResponse.length < 10; i++){
            if(fetchResponse[i].poster_path !== null){
              slicedResponse.push(fetchResponse[i])
            }
          }
        } else{
          slicedResponse = fetchResponse.slice(0,10);
        }

        this.setState({resultsFetched: true, apiResults: slicedResponse})
      });
    }
  }

  render() {
    let { resultsFetched, apiResults, query } = this.state;
    let result

    // If the resultsFetched variable is true, then it will map through the apiResults variable and create a grid display for each item.
    if(resultsFetched === true){
      result = apiResults.map((movie, i) => {
        return (
          <div class="col-sm-6 col-md-4">
            <div class="card mb-4">
              <img class="card-img-top" key={i.toString()} src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}/>
            </div>
          </div>
        )
      })
    }

    return (
      <div>
        <div class="jumbotron jumbotron-fluid">
          <div class="container mb-4">
            <div class="row justify-content-center">
              <h1 class="display-3 mt-3 mb-3">Movie Searcher!</h1>
              <p class="text-center"> Looking for a movie but can't remember the title? Type in a keyword you remember for the title and view the top 10 results. </p>
            </div>

            <form onSubmit={this.displaySearchResults}>
              <div class="row justify-content-center">
                <input type="text" class="mr-2" onChange={this.setQueryState}/>
                <button type="Submit" class="btn btn-outline-primary btn-sm"> Search </button>
              </div>
            </form>

          </div>
        </div>

        <div class="container">
          <div class="row">
            {result}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
