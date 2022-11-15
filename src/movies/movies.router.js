const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//? Route to list all movies "showing"
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);
 
//? Route to read the movieId 
router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

//? Route to use movieId read to find the theaters 
router.route("/:movieId/theaters/")
    .get(controller.listTheaters)
    .all(methodNotAllowed);

//? Route to use MovieId to get reviews
router.route("/:movieId/reviews")
    .get(controller.listReviews)
    .all(methodNotAllowed);

module.exports = router;

//! Router is using Controller = to GET this information go to controller. 