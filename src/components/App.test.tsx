import React from "react";
import { render, screen } from "@testing-library/react";
import { AppRoot } from "./App";

test("renders logo", () => {
  render(<AppRoot />);
  const logoWrapperElement = screen.getAllByTestId("logo").at(0);
  expect(logoWrapperElement).toBeInTheDocument();
});
