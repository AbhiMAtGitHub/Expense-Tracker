const onHeaders = require("on-headers");

module.exports = (req, res, next) => {
  const start = Date.now();

  onHeaders(res, () => {
    const duration = Date.now() - start;
    console.log(
      `[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};
