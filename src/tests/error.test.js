const request = require("supertest");
const app = require("../app");

describe("Error Middleware", () => {
  it("should catch internal server errors and return 500", async () => {
    const res = await request(app).get("/api/break-it");
    console.log("Error test response:", res.body);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
  });
});
