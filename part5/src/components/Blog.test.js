import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "React test",
    author: "benogre",
    url: "yep",
    user: {
      name: "benimanjaro",
    },
  };

  const component = render(<Blog blog={blog} />);
  const div = component.container.querySelector(".togglableContent");
  expect(div).toHaveStyle("display: none");
});

test("shows url and likes after the view button is pressed", () => {
  const blog = {
    title: "React test",
    author: "benogre",
    url: "yep",
    user: {
      name: "benimanjaro",
    },
  };
  const component = render(<Blog blog={blog} />);
  const div = component.container.querySelector(".togglableContent");
  const viewButton = component.getByText("view");

  fireEvent.click(viewButton);
  expect(div).not.toHaveStyle("display: none");
});

test("clicking the like button twice will call the component received as props twice", () => {
  const blog = {
    title: "React test",
    author: "benogre",
    url: "yep",
    user: {
      name: "benimanjaro",
    },
  };
  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} updateLike={mockHandler} />);
  const viewButton = component.getByText("view");
  fireEvent.click(viewButton);

  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
