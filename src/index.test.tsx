import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const mockReportWebVitals = jest.fn();
jest.mock("./reportWebVitals", () => mockReportWebVitals);
const mockRoot = { render: jest.fn(), unmount: jest.fn() };
const createRootSpy = jest.spyOn(ReactDOM, "createRoot");
const rootEl = document.createElement("div");

beforeAll(() => {
  rootEl.setAttribute("id", "root");
  document.body.appendChild(rootEl);
});

beforeEach(() => {
  jest.clearAllMocks();
  createRootSpy.mockReturnValue(mockRoot);
});

test("renders app and reports web vitals", async () => {
  expect(createRootSpy).not.toHaveBeenCalled();
  expect(mockRoot.render).not.toHaveBeenCalled();
  expect(mockReportWebVitals).not.toHaveBeenCalled();

  // simulate index page run
  await import("./index");

  expect(createRootSpy).toHaveBeenCalledTimes(1);
  expect(createRootSpy).toHaveBeenLastCalledWith(rootEl);

  expect(mockRoot.render).toHaveBeenCalledTimes(1);
  expect(mockRoot.render).toHaveBeenLastCalledWith(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  expect(mockReportWebVitals).toHaveBeenCalledTimes(1);
  expect(mockReportWebVitals).toHaveBeenLastCalledWith();
});
