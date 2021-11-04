const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRoutes = require("./controllers/BlogRoutes.js");
const mongoose = require("mongoose");
const config = require("./utilis/config");

mongoose
  .connect(config.MONGO_URI)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to mongoDB", error.message));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRoutes);

// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// app.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
