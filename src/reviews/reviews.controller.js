const service = require("./reviews.service");
const asyncError = require("../errors/asyncErrorBoundary");

// ----------- Middleware CRUDL --------------- // 
//* checks to see if the review exists. 
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}
// --------------- ---------- --------------- // 

//* reviews the Id in the params then updates to database
//* res.json will return the updated version of the review
async function update(req, res) {
  const { reviewId } = req.params;

  await service.update(reviewId, req.body.data);
  res.json({ data: await service.getUpdatedRecord(reviewId) });
}

//* deletes the row specified on what reviewId is clicked.
async function destroy(req, res) {
  const { reviewId } = req.params;

  await service.delete(reviewId);
  res.sendStatus(204);
}


module.exports = {
  update: [asyncError(reviewExists), asyncError(update)],
  delete: [asyncError(reviewExists), asyncError(destroy)],
};
