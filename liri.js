require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-Spotify-api");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
});
// var fs = require("fs");
var moment = require("moment");
var database = process.argv[2];
var input = process.argv.slice(3).join(" ");
var defaultMovie = "Mr. Nobody";
var defaultSong = "The Sign";

switch (database) {
    case "concert-this":
        getBands(input)
        break;
    case "spotify-this-song":
        if(!input){
            input = defaultSong;
        }
        getSong(input)
        break;
    case "movie-this":
        if (!input){
            input = defaultMovie;
        }
        getMovie(input)
        break;
    case "do-what-it-says":
        doCommand(input)
        break;
    default:
        break;
}

function getBands(artist){
    var artist = input;

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response){
            console.log("Venue Name: " + response.data[0].venue.name);
            console.log("Venue Location (City, Country): " + response.data[0].venue.city + ", " + response.data[0].venue.country);
            var date = moment(response.data[0].datetime).format("MM/DD/YYYY");
            console.log("Concert Date: " + date)
        }
    )
}

function getMovie(movie){
    var movie = input;

    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function(response){
            console.log("\nTitle: "+ response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    )

}

function getSong(){
    var song = input;

    spotify.search( {type: "track", query: song}, function(error, response){
        if (error){
            return console.log(error);
        }

        console.log(JSON.stringify(response));

        console.log(response)
        }
    )



    
}



