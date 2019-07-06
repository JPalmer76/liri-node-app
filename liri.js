var keys = require("./keys.js");
// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
// var movieThis = require("./movie-this.js");
var arg1 = process.argv[2];
var arg2 = process.argv[3];

var startProgram = function(arg1, arg2) {
  switch (arg1) {
    case "concert-this":
      getMyBands(arg2);
      break;
    case "movie-this":
      getMovieInfo(arg2);
      break;
    case "spotify-this-song":
      getSongInfo(arg2);
      break;
    case "do-what-it-says":
      getWhatItSays(arg2);
      break;
    default:
      console.log("Enter the right action");
  }
};

function getMovieInfo(movieName) {
  console.log("Get Movie");
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  var movieURL =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";
  axios
    .get(movieURL)
    .then(function(response) {
      var jsonData = response.data;
      var movieData = [
        "Title: " + jsonData.Title,
        "Year: " + jsonData.Year,
        "Country: " + jsonData.Country,
        "Language: " + jsonData.Language,
        "Plot: " + jsonData.Plot,
        "Actors: " + jsonData.Actors
      ].join("\n\n");
      console.log(movieData);
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(function() {});
}

function getMyBands(artist) {
  console.log("Get band info");

  var concertURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=95a3a5a0a600d61d0387aa74942b77e2";
  axios.get(concertURL).then(function(response) {
    console.log(response);
    var jsonData = response.data;
    var concertData = ["venue: " + jsonData.venue];
    console.log(concertData);
  });
}
startProgram(arg1, arg2);
// module.exports = movieThis;
