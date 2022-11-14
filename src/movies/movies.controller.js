//? Importing Service & Error Code
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    try {
        const data = await service.list();
        res.json({ data });
    } catch (error) {
        next(error);
    };
};

module.exports = {
    list: asyncErrorBoundary(list),
}