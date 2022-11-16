const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// -------------- MAP PROPERTIES -------------- // 
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});
// -------------- -------------- -------------- //

//* Query From: listIfShowing
//* lists all movies in the movie table
function list() {
    return knex("movies")
    .select("*");
}

//* Query From: listIfShowing
//* lists all the movies that are labled "is_showing" as true
function listShowingMovies() {
    return knex("movies")
        .join("movies_theaters as mt", 
            "movies.movie_id", "mt.movie_id")
        .select("movies.*", "mt.is_showing")
        .groupBy("movies.movie_id")
        .where({ is_showing: true });
}

//* Query From: moviesExist
//* returns the movie from the given movieId
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first()
}

//* Query From: listTheaters
//* lists all theaters where given movie is playing
function listTheaters(movie_id) {
    return knex("theaters")
        .join("movies_theaters as mt", "mt.theater_id", "theaters.theater_id")
        .select("theater.*", "mt.movie_id", "mt.is_showing")
        .where({ "mt.movie_id": movie_id })
}


//* Query From: listReviews
//* uses the addCritic to add critics to reviews
async function listReviews(movie_id) {
   return knex("reviews")
      .join("critics", "critics.critic_id", "reviews.critic_id")
      .select("reviews.*", "critics.*")
      .where({ "reviews.movie_id": movie_id })
      .then((reviews) => reviews.map(review => addCritic(review)))
};


module.exports = {
    list,
    listShowingMovies,
    read,
    listTheaters,
    listReviews,
}
