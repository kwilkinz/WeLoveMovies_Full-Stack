const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// ------------------ middleware ------------------ // 

//* READ = see if review exists in database 
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
}
// ------------------ --------- ------------------ // 

async function list(req, res) {
    const data = await service.list();
    res.json({ data });
  }

//* UPDATE = on reviewId 
async function update(req, res) {
    const { reviewId } = req.params;
    await service.update(reviewId, req.body.data);
    res.json({ data: await service.readUpdatedRecord(reviewId) });
  }

//* DELETE = on reviewId
//* deletes the review from the given reviewId
async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review.review_id)
    res.sendStatus(204);
}


module.exports = {
    list: asyncErrorBoundary(list),
    update: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(update),
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy),
    ],
};