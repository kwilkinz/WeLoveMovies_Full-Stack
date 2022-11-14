const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//? list 
async function list(req, res) {
    const { movieId } = req.params;
    const review = await service.listByMovieId(movieId);
    res.json({ data: review })
}

//? reviewExists 
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

//? validProperties to use 
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

//? Update 
async function update(req, res) {
    const updateReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    const data = await service.update(updateReview);
    res.json({ data });
}

//? destroy 
async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review.review_id);
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