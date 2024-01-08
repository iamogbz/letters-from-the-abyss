import reportWebVitals from "./reportWebVitals";

const mockWebVitals = {
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
};
jest.mock("web-vitals", () => mockWebVitals);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("reportWebVitals", () => {
  test("does nothing when no performance callback given", async () => {
    await reportWebVitals();
    Object.values(mockWebVitals).forEach((fn) =>
      expect(fn).not.toHaveBeenCalled()
    );
  });

  test("does nothing when invalud performance callback given", async () => {
    // @ts-expect-error passing invalid value
    await reportWebVitals("this is not a function");
    Object.values(mockWebVitals).forEach((fn) =>
      expect(fn).not.toHaveBeenCalled()
    );
  });

  test("calls all expected methods with performance callback", async () => {
    const onPerfEntryFn = () => undefined;
    await reportWebVitals(onPerfEntryFn);
    Object.values(mockWebVitals).forEach((fn) => {
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenLastCalledWith(onPerfEntryFn);
    });
  });
});
