const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//* Query From: listIfShowing
function listShowingMovies() {
    return knex("movies")
        .join("movies_theaters as mt", 
            "movies.movie_id", "mt.movie_id")
        .select("movies.*")
        .where({ "mt.is_showing": true })
        .groupBy("movies.movie_id")
}


//* Query From: listIfShowing
function list() {
    return knex("movies")
    .select("*")
    .groupBy("movies.movie_id")
}

//* Query From: moviesExist
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .groupBy("movies.movie_id")
        .first()
}

//* Query From: listTheaters
function listTheaters(movieId) {
    return knex("movies_theaters as mt")
        .join("theaters",
            "mt.theater_id", "theaters.theater_id")
        .select("*")
        .where({ movie_id: movieId, is_showing: true })
}

// Will be used for ListReviews: 
const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

//* Query From: listReviews
function listReviews(movieId) {
    return knex("movies")
        .join("reviews", 
            "movies.movie_id", "reviews.movie_id")
        .join("critics",
            "critics.critic_id", "reviews.critic_id")
        .select("*")
        .where({ "reviews.movie_id": movieId })
        .then((result) => {
            const movieList = [];
            result.forEach((item) => {
                const addNewObject = addCritic(item);
                movieList.push(addNewObject);
            })
            return movieList;
        })
}




module.exports = {
    listShowingMovies,
    list,
    read,
    listTheaters,
    listReviews,
}

// Querying through the database so service can return back material to controller.