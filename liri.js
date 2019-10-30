require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
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



function searchMusic(songTitle) {
    if (!songTitle) {
        songTitle = "The Sign";
    }
    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);

        console.log(`\r\n======\r\n
    Song Title: ${data.tracks.items[0].name} \r\n
    Artist(s): ${data.tracks.items[0].artists[0].name}\r\n
    Preview Link: ${data.tracks.items[0].href}
    Song Album: ${data.tracks.items[0].album.name}
`)
    });


};

function searchMovie(movieTitle) {
    if (!movieTitle) {
        movieTitle = "Mr. Nobody";
    }
    var apiKey = "trilogy";
    var movieURL = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;

    axios.get(movieURL)
        .then(function (response) {

            console.log(`\r\n================= \r\n
 Movie title: ${response.data.Title} \r\n
 Year released: ${response.data.Year} \r\n
 IMDB rating: ${response.data.Ratings[0].Value} \r\n
 Rotten Tomatoes rating: ${response.data.Ratings[1].Value} \r\n
 Country where produced: ${response.data.Country} \r\n
 Language: ${response.data.Language} \r\n
 Plot: ${response.data.Plot} \r\n
 Actors: ${response.data.Actors} \r\n
            ================= \r\n`);

        })
        .catch(function (error) {

            console.log(error);
        })
        .finally(function () {

        });

};

function searchBands(artist) {
    var bandsURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    axios.get(bandsURL)
        .then(function (response) {
            console.log(`\r\n================= \r\n
            Name of the Venue: ${response.data[0].venue.name} \r\n
            Venue Location: ${response.data[0].venue.city} \r\n
            Date of the Event: ${moment(response.data[0].datetime).format("MM/DD/YYYY")} \r\n                     ================= \r\n`);

        })
        .catch(function (error) {

            console.log(error);
        })
        .finally(function () {

        });

};