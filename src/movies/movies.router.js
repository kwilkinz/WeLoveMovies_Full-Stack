const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: route("/:movieId/reviews), movieExists, reviewRouter

// TODO: route ("/:movieId/theaters"), movieExists, theaterRouter

//TODO: route ("/:movieId"), get, all


router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;