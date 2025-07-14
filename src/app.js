require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(loggerMiddleware);
app.use(errorMiddleware);

app.use("/api", routes);

app.get("/api/break-it", (req, res, next) => {
  next(new Error("Force crash"));
});

app.get("/api/ping", (req, res) => res.status(200).send("pong"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.status(200).send(`
    <h2>Welcome to the Expense Tracker API</h2>
    <p>Visit <a href="/api-docs" target="_blank">/api-docs</a> for full Swagger documentation of available API routes.</p>
  `);
});

console.log("Starting Expense Tracker API...");

module.exports = app;
