require("dotenv").config();
const app = require("./src/app");
const { connectDB } = require("./src/config/db");
const config = require("./src/config");

const PORT = config.port || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
  });
