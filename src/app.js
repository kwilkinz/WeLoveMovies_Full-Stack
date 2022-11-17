if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

//? Importing Error Files 
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

//? Importing Controller / router 
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

//? Initializing
const app = express();
app.use(cors());
app.use(express.json());

//? Routes 
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//? Error Handlers 
app.use(notFound);
app.use(errorHandler);

module.exports = app;
