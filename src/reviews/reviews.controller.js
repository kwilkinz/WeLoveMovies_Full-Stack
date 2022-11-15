const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//* LIST = list movies by Id 
async function list(req, res) {
    const { movieId } = req.params;
    res.json({ data: await service.listByMovieId(movieId ) });
}

//* READ = see if review exists in database 
async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({
        status: 404,
        message: `Review cannot be found.`
    });
}

// validProperties to use 
const validPropertiesRequired = ["score", "content"];
function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
    const invalidFields = Object.keys(data).filter((field) => 
    !validPropertiesRequired.includes(field)
    );
    if (invalidFields.length) {
        return next({
            status: 400,
            message: `Invalid field(s): ${invalidFields.join(", ")}`,
        });
    }
    next();
}

//* UPDATE = on reviewId 
async function update(req, res) {
    // const { reviewId } = req.params;
    const updateReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    res.json({ data: await service.update(updateReview) })
}

//* DELETE = on reviewId
async function destroy(req, res) {
    const { reviewId } = req.params;
    await service.delete(reviewId);
    res.sendStatus(204);
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    update: [
        asyncErrorBoundary(reviewExists),
        hasOnlyValidProperties, 
        asyncErrorBoundary(update),
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy),
    ]
};