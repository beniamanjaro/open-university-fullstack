import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("form calls event handler received as props when new blog is created", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm handleCreateBlog={createBlog} />);

  const inputTitle = component.container.querySelector("#title");
  const inputAuthor = component.container.querySelector("#author");
  const inputUrl = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(inputTitle, {
    target: { value: "title test" },
  });
  fireEvent.change(inputAuthor, {
    target: { value: "author test" },
  });
  fireEvent.change(inputUrl, {
    target: { value: "url test" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("title test");
  expect(createBlog.mock.calls[0][0].author).toBe("author test");
  expect(createBlog.mock.calls[0][0].url).toBe("url test");
});
