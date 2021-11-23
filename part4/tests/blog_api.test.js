const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/Blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(helper.initialBlogs.length);
  });

  test("all blogs contain an id", async () => {
    const blogs = await api.get("/api/blogs");
    blogs.body.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

test("if likes field is missing will return 0 likes by default", async () => {
  const blog = {
    title: "This blog has 0 likes",
    author: "ThisWillBeRemovedSoon",
    url: "ThisWillBeRemovedSoon",
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAfterPost = await helper.blogsInDb();
  expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1);
  const filteredBlog = await blogsAfterPost.find(
    (blog) => blog.title === "This blog has 0 likes"
  );
  console.log(filteredBlog);
  expect(filteredBlog.likes).toBe(0);
});
describe.only("additon of a blog", () => {
  test("succesful with valid data", async () => {
    const blog = {
      title: "ffffff",
      author: "awdwad",
      likes: 10,
      url: "wwww",
    };
    const token =
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlbm9ncmU0IiwiaWQiOiI2MTljNDdjNzFlODBiOTU4OGRmOTFhY2QiLCJpYXQiOjE2Mzc2MzE5NTN9.2uX2VjpWpnGVnEN8rhi16dht3N-yxgeH1RczXK8jRUM";

    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(blog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1);
  });
  test("failed with code 400 if data is invalid or access token is not provided", async () => {
    const blog = {
      title: "ThisWillBeRemovedSoon",
      likes: 0,
      url: "ThisWillBeRemovedSoon",
    };

    await api.post("/api/blogs").send(blog).expect(401);

    const blogsAfterPost = await helper.blogsInDb();
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length);
  });
});

describe("updating a blog", () => {
  test("succesful with valid id", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];
    const blog = {
      title: "dummy title",
      author: "dummy author",
      url: "www.dummy.com",
      likes: "900",
    };
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(200);
    const blogsAfterPut = await helper.blogsInDb();
    const titles = blogsAfterPut.map((blog) => blog.title);
    expect(titles).toContain("dummy title");
  });
});

describe("deletion of a blog", () => {
  test("succesful with status code 204 if data is valid", async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe("When there's initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ name: "root", passwordHash });
    await user.save();
  });

  test("creation succedes with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "benogre",
      name: "beni",
      password: "secret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAfterPost = await helper.usersInDb();
    expect(usersAfterPost.length).toHaveLength(usersAtStart.length + 1);
  });

  test("creation fails when the username is already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "NameTaken",
      password: "supersecret",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAfterPost = helper.usersInDb();
    expect(usersAtStart.length).toHaveLength(usersAfterPost.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
