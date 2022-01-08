import React, { useState } from "react";

const Blog = ({ blog, updateLike, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  let isCreatedByUser;
  if (user) {
    isCreatedByUser = user.id === blog.user.id;
  } else {
    isCreatedByUser = false;
  }

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeUpdate = () => {
    updateLike({ ...blog, likes: likes + 1 });
    let updatedLikes = likes + 1;
    setLikes(updatedLikes);
  };

  const handleDeleteBlog = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      console.log(blog);
      deleteBlog(blog);
    }
  };

  return (
    <div style={{ border: "dotted 5px green", margin: "5px" }}>
      {isCreatedByUser ? (
        <div style={showWhenVisible}>
          <div style={{ display: "inline-block" }}>
            {`${blog.title} by ${blog.author}`}
          </div>
          <button onClick={toggleVisibility}>hide</button>
          <div>{blog.url}</div>
          <div style={{ display: "inline-block" }}>{likes}</div>
          <button onClick={handleLikeUpdate}>like</button>
          <div>{blog.user.name}</div>
          <button onClick={handleDeleteBlog}>delete</button>
        </div>
      ) : (
        <div style={showWhenVisible}>
          <div style={{ display: "inline-block" }}>
            {`${blog.title} by ${blog.author}`}
          </div>
          <button onClick={toggleVisibility}>hide</button>
          <div>{blog.url}</div>
          <div style={{ display: "inline-block" }}>{likes}</div>
          <button onClick={handleLikeUpdate}>like</button>
          <div>{blog.user.name}</div>
        </div>
      )}
      <div style={hideWhenVisible}>
        <div style={{ display: "inline-block" }}>
          {`${blog.title} by ${blog.author}`}
        </div>
        <button onClick={toggleVisibility}>view</button>
      </div>
    </div>
  );
};

export default Blog;
