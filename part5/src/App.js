import React, { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import ErrorMessage from "./components/ErrorMessage";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginFrom";
import BlogForm from "./components/BlogForm";
import loginService from "./services/login";
import Togglable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (loginInfo) => {
    try {
      const user = await loginService.login(loginInfo);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleUpdateLike = async (newBlog) => {
    const updatedBlog = await blogService.update(newBlog.id, newBlog);
  };

  const handleDeleteBlog = async (blog) => {
    await blogService.deleteBlog(blog.id);
    setBlogs(blogs.filter((b) => b.title !== blog.title));
  };

  const handleCreateBlog = async (newObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(newObject);
      setBlogs(blogs.concat(newBlog));
      setNotificationMessage(
        `a new blog '${newObject.title}' by ${newObject.author} has been added!`
      );
      console.log(blogs);
      setTimeout(() => {
        setNotificationMessage("");
      }, 3000);
    } catch (exception) {
      setErrorMessage("Wrong Blog input");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };
  const handleLogout = () => {
    console.log("logout");
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <ErrorMessage message={errorMessage} />
      <Notification message={notificationMessage} />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm handlelogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <div style={{ display: "inline-block" }}>
            <p>{user.name} logged-in</p>
          </div>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="create blog" ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
        </div>
      )}
      <h2>blogs</h2>
      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLike={handleUpdateLike}
          user={user}
          deleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
