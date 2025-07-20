require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");
const [
  requestLogger,
  morganLogger,
] = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const helmet = require("helmet");
const { limiter } = require("./utils/common");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.join(__dirname, "/docs/swagger.yaml"));

app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(limiter);

app.use(requestLogger);
app.use(morganLogger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", routes);

app.get("/api/break-it", (req, res, next) => {
  next(new Error("Force crash"));
});

app.get("/api/ping", (req, res) => res.status(200).send("pong"));

app.get("/", (req, res) => {
  res.status(200).send(`
    <h2>Welcome to the Expense Tracker API</h2>
    <p>Visit <a href="/api-docs" target="_blank">/api-docs</a> for full Swagger documentation of available API routes.</p>
    `);
});

app.use(errorMiddleware);
console.log("Starting Expense Tracker API...");

module.exports = app;
