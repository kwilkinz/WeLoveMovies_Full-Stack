const service = require("./movies.service");
const asyncError = require("../errors/asyncErrorBoundary");

// --------------- Middleware --------------- // 
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}
// --------------- ---------- --------------- // 

//* first func() will display all movies currently playing in theaters. 
//* Second func() will display all movies. 
async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  if (isShowing) {
    res.json({ data: await service.listActiveMovies() });
  } else {
    res.json({ data: await service.list() });
  }
}

//* when clicking on a specific movieId this will show what theaters the 
//* Movie are playing in. 
async function listTheaters(req, res, next) {
  const { movieId } = req.params;
  const theaters = await service.listTheaters(movieId);
  res.json({ data: theaters });
}

//* Every movie comes with reviews this will show reviews based on the movieId. 
async function listReviews(req, res, next) {
  const { movieId } = req.params;
  const reviews = await service.listReviews(movieId);
  res.json({ data: reviews });
}

//* Reading the movie data that list is retrieving. 
async function read(req, res, next) {
  const movie = res.locals.movie;
  res.json({ data: movie });
}

module.exports = {
  list: asyncError(list),
  listTheaters: [asyncError(movieExists), asyncError(listTheaters)],
  listReviews: [asyncError(movieExists), asyncError(listReviews)],
  read: [asyncError(movieExists), read],
};
