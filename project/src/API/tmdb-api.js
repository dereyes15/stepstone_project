const apiKey = "48999c48a091ec759860ba60cb88ab49";

let searchFetch = function(query){
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
  )
  .then(res => {
    res = res.json()
    return Promise.resolve(res);
  })
  .then(json => {
    console.log("results", json.results);
    return json.results
  })
}

export {
  searchFetch
}
