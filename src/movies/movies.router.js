const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// URL is /movies - will return a list of All movies 
router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);

  
  //URl is /movies/15 - theaters based on given movieId ( in this case 15 )
  router.route("/:movieId/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);
  
  // URL is /movies/15 - reviews based on given movieId ( in this case 15 )
  router.route("/:movieId/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);
  
  //URL is /movies/15 - returns runtime, rating, average rating, theaters, and reviews. 
  router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);
    
module.exports = router;
