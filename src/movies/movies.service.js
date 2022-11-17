const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// ------------- Imported Properties ------------- // 
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});
// ------------- ------------------- ------------- // 

//* Querying - returning all movies grouped by movieId
function list() {
  return knex("movies")
    .select("*")
    .groupBy("movies.movie_id");
}

//* Querying - returning all movies that are active in movie theaters 
function listActiveMovies() {
  return knex("movies")
    .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
    .select("movies.*")
    .where({ "mt.is_showing": true })
    .groupBy("movies.movie_id");
}


//*Querying - all movies will have a list of theaters under each movie.
function listTheaters(id) {
  return knex("movies_theaters as mt")
  .join("theaters as t", "mt.theater_id", "t.theater_id")
  .select("*")
  .where({ movie_id: id, is_showing: true });
}

//* Querying - reviews based of of the movieId
function listReviews(id) {
  return knex("movies as m")
  .join("reviews as r", "m.movie_id", "r.movie_id")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .select("*")
  .where({ "r.movie_id": id })
  .then(reviews => reviews.map(review => addCritic(review)))
}

//* Querying - All movies with movieId
function read(id) {
  return knex("movies")
    .select("*")
    .where({ movie_id: id })
    .groupBy("movies.movie_id")
    .first();
}


module.exports = {
  list,
  listActiveMovies,
  read,
  listTheaters,
  listReviews,
};
