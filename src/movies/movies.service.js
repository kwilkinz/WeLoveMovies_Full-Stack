const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//* Query From: listIfShowing
//* lists all the movies that are labled "is_showing" as true
function listShowingMovies() {
    return knex("movies")
        .join("movies_theaters as mt", 
            "movies.movie_id", "mt.movie_id")
        .select("movies.*")
        .where({ "mt.is_showing": true })
        .groupBy("movies.movie_id")
}


//* Query From: listIfShowing
//* lists all movies in the movie table
function list() {
    return knex("movies")
    .select("*")
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
function listTheaters(movieId) {
    return knex("movies")
        .join("movies_theaters as mt", 
            "movies.movie_id", "mt.movie_id")
        .join("theaters", 
            "mt.theater_id", "theater.theater_id")
        .select("theater.*", "mt.is_showing", "mt.movie_id")
        .where({ "mt.movie_id": movieId })
}

//* funciton that adds critic objects to the given review
async function addCritic(review, criticId) {
    review.critic = await knex("critics")
        .select("*")
        .where({ critic_id: criticId })
        .first();
        return review;
}
//* Query From: listReviews
//* uses the addCritic to add critics to reviews
async function listReviews(movieId) {
   return knex("reviews")
        .select("*")
        .where({ "reviews.movie_id": movieId })
        .then((reviews) => {
            return Promise.all(
                reviews.map((review) => {
                    return addCritic(review, review.critic_id)
                })
            )
        });
}


module.exports = {
    list,
    listShowingMovies,
    read,
    listTheaters,
    listReviews,
}
