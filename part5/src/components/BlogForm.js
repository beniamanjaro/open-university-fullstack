import React from "react";

const blogForm = ({
  handleCreateBlog,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
}) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
        ></input>
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        ></input>
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        ></input>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default blogForm;
