const request = require("supertest");
const app = require("../app");

describe("Logging Middleware", () => {
  it("should log the request and response", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await request(app).get("/api/ping");

    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
