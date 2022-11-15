const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//* Lists all reviews
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

//* Updates and Deletes on Id
router.route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;