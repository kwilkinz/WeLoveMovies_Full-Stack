const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// -------------- MAP PROPERTIES -------------- //
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});
// -------------- -------------- -------------- //

function list() {
  return knex("reviews").select("*");
}

//* Query From: destroy()
//* deletes the row from the given reviewId
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

//* Query From: updateReview()
function update(reviewId, updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update(updatedReview, "*");
}

function readUpdatedRecord(reviewId) {
  return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((comment) => {
      const updatedRecord = addCritic(comment);
      updatedRecord.critic_id = updatedRecord.critic.critic_id;
      return updatedRecord;
    });
}

//* Query From: reviewExists()
//* returns the review from the given reviewId
function read(review_id) {
  return knex("reviews").select("*").where({ review_id: review_id }).first();
}

module.exports = {
  list,
  delete: destroy,
  update,
  readUpdatedRecord,
  read,
};
