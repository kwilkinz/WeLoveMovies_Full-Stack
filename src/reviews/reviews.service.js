const knex = require("../db/connection");

//TODO:  Query attach review to critic 


//?: Read  
function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId})
        .first();
}

//TODO: List movies > listByMovieId


//? Update the review
function update(updateReview) {
    return knex("reviews")
        .join("critics", "review_critic_id", "critics.critic_id")
        .where({ review_id: updateReview.review_id })
        .update(updateReview, "*");
}

//? Delete the review based on the reviewId
function destroy(reviewId) {
    return knex("reviews")
        .where({ review_id: reviewId })
        .del();
}

module.exports = {
    
    read,
    update,
    delete: destroy, 
};
