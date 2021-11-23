const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const blogRoutes = require("./controllers/BlogRoutes.js");
const userRoutes = require("./controllers/UserRoutes.js");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const userExtractor = middleware.userExtractor;

mongoose
  .connect(config.MONGO_URI)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to mongoDB", error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.getTokenFrom);
app.use("/api/blogs", userExtractor, blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
