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

//* updates the given reviewId
function update(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update("*");
}

//* critics attached to each review posted.
function getUpdatedRecord(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then(addCritic)
}

//* read all the reviews
function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first();
}

//* deletes the specified review based on the given reviewId
function destroy(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId })
    .del();
}

module.exports = {
  update,
  getUpdatedRecord,
  read,
  delete: destroy,
};
