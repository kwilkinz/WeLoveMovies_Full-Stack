const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


//* Updates and Deletes on Id
router.route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;