describe("Config Loader", () => {
  it("should load env variables correctly", () => {
    const config = require("../config");
    expect(config.port).toBeDefined();
    expect(config.mongoUri).toContain("mongodb");
    expect(config.jwtSecret).toBe(process.env.JWT_SECRET);
  });
});
