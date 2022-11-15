const knex = require("../db/connection");

//? List all movies 
function list() {
    return knex("movies").select("*");
}

//TODO: ListMoviesShowing > using movie_id & theater_movie_id 

//TODO: read by (movieId) > select all > where movie_id > first()

module.exports = {
    list,
}
