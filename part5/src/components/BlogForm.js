import React, { useState } from "react";

const BlogForm = ({ handleCreateBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    handleCreateBlog({
      title: title,
      url: url,
      author: author,
    });
    setAuthor("");
    setUrl("");
    setTitle("");
  };
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
        ></input>
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        ></input>
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        ></input>
      </div>
      <button id="create-button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
