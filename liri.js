require("dotenv").config();
const axios = require('axios');

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var userInput = process.argv.slice(3).join(" ");
var command = process.argv[2];


switch (command) {
    case "concert-this":
        searchBands(userInput);
        break;
    case "spotify-this-song":
        searchMusic(userInput);
        break;
    case "movie-this":
        searchMovie(userInput);
        break;
    case "do-what-it-says":
    //  spotify-this-song,"I Want it That Way"
}



function searchMusic() {
    


};

function searchMovie(movieTitle) {
    if(movieTitle) {
        movieTitle = "Mr. Nobody";
    }
    var apiKey = "trilogy";
    var movieURL = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;

    axios.get(movieURL)
        .then(function (response) {

            console.log(response);
        })
        .catch(function (error) {

            console.log(error);
        })
        .finally(function () {

        });

};

function searchBands(artist) {
    var artist = query;
    var bandsURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    axios.get(bandsURL)
        .then(function (response) {

            console.log(response);
        })
        .catch(function (error) {

            console.log(error);
        })
        .finally(function () {

        });

};