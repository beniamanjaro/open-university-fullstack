const blogRoutes = require("express").Router();
const Blog = require("../models/blog.js");
const middleware = require("../utils/middleware");
const userExtractor = middleware.userExtractor;
require("dotenv").config();

blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRoutes.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogRoutes.post("/", userExtractor, async (request, response, next) => {
  const { body } = request;
  const user = request.user;
  if (!request.token || !user._id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

blogRoutes.put("/:id", async (request, response, next) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

blogRoutes.delete("/:id", async (request, response, next) => {
  const blogToDelete = await Blog.findById(request.params.id);
  const user = request.user;
  if (blogToDelete.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
  response.status(401).json({ error: "invalid token" });
});

module.exports = blogRoutes;
