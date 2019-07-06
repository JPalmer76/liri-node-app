// var axios = require("axios");
// var keys = require("./keys");
// var arg1 = process.argv[2];
// var arg2 = process.argv[3];

// var startProgram = function(arg1, arg2) {
//   switch (arg1) {
//     case "my-bands":
//       getMyBands(arg2);
//       break;
//     case "movie-this":
//       getMovieInfo(arg2);
//       break;
//     case "spotify-this-song":
//       getSongInfo(arg2);
//       break;
//     case "do-what-it-says":
//       getWhatItSays(arg2);
//       break;
//     default:
//       console.log("Enter the right action");
//   }
// };

// function getMovieInfo(movieName) {
//   console.log("Get Movie");
//   if (movieName === undefined) {
//     movieName = "Mr. Nobody";
//   }
// }

// var movieThis = function(movieName) {
//   var URL = "http://www.omdbapi.com/?apiKey=" + keys.omdb + "&t=" + movieName;
//   axios
//     .get(URL)
//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(err) {
//       console.log(err);
//     })
//     .finally(function() {});

//   var jsonData = response.data;
//   var movieData = [
//     "Title: " + jsonData.Title,
//     "Year: " + jsonData.Year,
//     "Country: " + jsonData.Country,
//     "Language: " + jsonData.Language,
//     "Plot: " + jsonData.Plot,
//     "Actors: " + jsonData.Actors
//   ];
// }.catch(function(err) {
//   if (err) throw err;
//   console.log(movieData);
// });

// startProgram(arg1, arg2);
// module.exports = movieThis;
