const knex = require("../db/connection");

//* funciton that adds critic objects to the given review
async function addCritic(review, criticId) {
    review.critic = await knex("critics")
        .select("*")
        .where({ critic_id: criticId })
        .first();
        return review;
}

//* Query From: reviewExists()
//* returns the review from the given reviewId
function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId})
        .first();
}

//* Query From: updateReview()
function update(updatedReview) {
    return knex("reviews")
        .where({ "review_id": updatedReview.review_id })
        .update(updatedReview, "*")
}

async function readUpdate(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
        .then((review) => {
            return addCritic(review, review.critic_id)
        })
}

//* Query From: destroy()
//* deletes the row from the given reviewId
function destroy(reviewId) {
    return knex("reviews")
        .where({ review_id: reviewId })
        .del();
}

module.exports = {
    read,
    update,
    readUpdate,
    delete: destroy, 
};
