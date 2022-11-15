//? Importing Service & Error Code
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//* LIST = all movies that are showing 
async function list(req, res) {
   const trueShowing = req.query.is_showing
   if (trueShowing) {
       res.json({ data: await service.listShowingMovies() });
   } else {
       res.json({ data: await service.list() })
   }
};


//* READ = all Movies
async function read(req, res) {
    const { movie } = res.locals.movie;
    res.json({ data: movie })
}


//* READ = see if movie Exists in database
async function moviesExist(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie; 
        return next();
    }
    next({
        status: 404, 
        message: `Movie cannot be found.`
    })
}


//* LIST = theater data
async function listTheaters(req, res) {
    const { movieId } = req.params;
    res.json({ data: await service.listTheaters(movieId) });
}


//* LIST = listReviews 
async function listReviews(req, res) {
    const { movieId } = req.params;
    res.json({ data: await service.listReviews(movieId) });
}



module.exports = {
    list: [
        asyncErrorBoundary(list),
    ],
    read: [
        asyncErrorBoundary(moviesExist),
        asyncErrorBoundary(read),
    ],
    listTheaters: [asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(listReviews)],
}

// Controller is calling Service = i'll wait until you find the data i need then i will return back to the client