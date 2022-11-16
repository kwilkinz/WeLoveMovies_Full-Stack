// Importing Service & Error Code
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//* LIST = all movies that are showing
async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await service.listShowingMovies();
    res.json({ data });
  }
  const data = await service.list();
  res.json({ data });
}

// ------------------ middleware ------------------ //

//* READ = see if movie Exists in database
async function moviesExist(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
    next({ status: 404, message: `Movie cannot be found.` })
  }
}

//* READ = all Movies, returns a movie from given MovieId
function read(req, res, next) {
  res.json({ data: res.locals.movie });
}


//* LIST = theater data, returns all theaters where movieId given
async function listTheaters(req, res, next) {
  const movie = res.locals.movie.movie_id;
  res.json({ data: await service.listTheaters(movie) });
}

//* LIST = listReviews
async function listReviews(req, res) {
  const movie = res.locals.movie.movie_id;
  res.json({ data: await service.listReviews(movie) });
}


module.exports = {
  list: asyncErrorBoundary(list),
  moviesExist: asyncErrorBoundary(moviesExist),
  read: [asyncErrorBoundary(moviesExist), asyncErrorBoundary(read)],
  listTheaters: [
    asyncErrorBoundary(moviesExist), 
    asyncErrorBoundary(listTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(moviesExist), 
    asyncErrorBoundary(listReviews),
  ],
};