import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
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

  expect(component.container).toHaveTextContent("benogre");
});
