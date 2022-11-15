const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//* UPDATE = on reviewId 
async function update(req, res) {
    const updateData = req.body.data;
    const { reviewId } = req.params; 

    const updatedReview = {
        ...res.locals.review,
        ...updateData,
        review_id: reviewId
    }
    await service.update(updatedReview);
    const data = await service.readUpdate(reviewId)
    res.json({ data: data })
  }

//* DELETE = on reviewId
//* deletes the review from the given reviewId
async function destroy(req, res) {
    const { reviewId } = req.params;
    await service.delete(reviewId)
    res.sendStatus(204);
}


// ------------------ middleware ------------------ // 

//* READ = see if review exists in database 
async function reviewExists(req, res, next) {
    const data = await service.read(req.params.reviewId);
    if (data) {
        res.locals.review = data;
        return next();
    }
    next({
        status: 404,
        message: `Review cannot be found.`
    });
}



module.exports = {
    update: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(update),
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy),
    ]
};