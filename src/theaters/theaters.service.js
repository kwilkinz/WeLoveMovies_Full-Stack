const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// --------------- Reduce Properties --------------- //
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});
//  --------------- --------------- ---------------  //

//*Query FROM list() that lists all theaters
//* uses the addMovies function to attach a movies array to each theater object
function list() {
  return knex("theaters")
    .join("movies_theaters as mt", "mt.theater_id", "theaters.theater_id")
    .join("movies", "movies.movie_id", "mt.movie_id")
    .then(reduceMovies);
}

module.exports = {
  list,
};
