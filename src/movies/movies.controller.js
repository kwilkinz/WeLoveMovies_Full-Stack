// Importing Service & Error Code
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//* LIST = all movies that are showing 
async function list(req, res) {
   const trueShowing = req.query.is_showing;
   let data;
   if (trueShowing) {
       data = await service.listShowingMovies();
   } else {
       data = await service.list();
   }
   res.json({ data: data })
};


//* READ = all Movies, returns a movie from given MovieId
async function read(req, res) {
    const data = res.locals.movie;
    res.json({ data: data})
}


//* LIST = theater data, returns all theaters where movieId given
async function listTheaters(req, res) {
    const { movieId } = req.params;
    const data = await service.listTheaters(movieId) ;
    res.json({ data: data });
}


//* LIST = listReviews 
async function listReviews(req, res) {
    const { movieId } = req.params;
    const data = await service.listReviews(movieId); 
    res.json({ data: data });
}

// ------------------ middleware ------------------ // 

//* READ = see if movie Exists in database
async function moviesExist(req, res, next) {
    const movie = await service.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie; 
        return next()
    }
    next({
        status: 404, 
        message: `Movie cannot be found.`
    })
}


module.exports = {
    list: [
        asyncErrorBoundary(list),
    ],
    read: [moviesExist, asyncErrorBoundary(read)],
    listTheaters: [moviesExist, asyncErrorBoundary(listTheaters)],
    listReviews: [moviesExist, asyncErrorBoundary(listReviews)],
}

// Controller is calling Service = i'll wait until you find the data i need then i will return back to the client