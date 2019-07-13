var moment = require("moment");
var fs = require("fs");
var dot = require("dotenv").config();
var divider =
  "\n------------------------------------------------------------\n\n";
var axios = require("axios");
var arg1 = process.argv[2];
var arg2 = process.argv.slice(3).join(" ");

// console.log(dot);

//Start Program function
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
      doWhatItSays(arg2);
      break;
    default:
      console.log("Enter the right action");
  }
};

//Get movie info function
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
        divider,
        "Title: " + jsonData.Title,
        "Year: " + jsonData.Year,
        "Country: " + jsonData.Country,
        "Language: " + jsonData.Language,
        "Plot: " + jsonData.Plot,
        "Actors: " + jsonData.Actors,
        divider
      ].join("\n\n");
      console.log(movieData);
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(function() {});
}

//Get Bands in town function
function getMyBands(artist) {
  console.log("Get band info");

  var concertURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=95a3a5a0a600d61d0387aa74942b77e2";
  axios.get(concertURL).then(function(response) {
    console.log(response);

    var jsonData = response.data[0];
    var concertTime = jsonData.datetime;
    var concertData = [
      divider,
      "venue: " + jsonData.venue.name,
      "location:" + jsonData.venue.city,
      "Time of Event: " + moment(concertTime).format("MM/DD/YYYY h:mm:ss a"),
      divider
    ].join("\n\n");
    console.log(concertData);
  });
}

//Get song info function
function getSongInfo(arg2) {
  var Spotify = require("node-spotify-api");
  var track = arg2;
  var spotify = new Spotify({
    id: dot.parsed.SPOTIFY_ID,
    secret: dot.parsed.SPOTIFY_SECRET
  });

  spotify
    .search({ type: "track", query: track, limit: 1 })
    .then(function(response) {
      console.log(response);
      var response = response.tracks.items[0];
      var musicData = [
        divider,
        "Album Name: " + response.album.name,
        "Song Name: " + response.name,
        "Artist Name: " + response.artists[0].name,
        "Preview Link: " + response.external_urls.spotify,
        divider
      ].join("\n\n");
      console.log(musicData);
    })
    .catch(function(error) {
      console.log(error);
      getSongInfo("The Sign Ace of Base");
    });
}

// Do-What-It-Says function
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    var dataArr = data.split(",");
    var action = dataArr[0];
    var query = dataArr[1];

    switch (action) {
      case "spotify-this-song":
        getSongInfo(query);
        break;
      case "concert-this":
        getMyBands(query);
        break;
      case "movie-this":
        getMovieInfo(query);
        break;
    }
  });
}

startProgram(arg1, arg2);
// module.exports = movieThis;
