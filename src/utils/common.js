const rateLimit = require("express-rate-limit");

const buildPaginationQuery = (query) => {
  const limit = Math.max(parseInt(query.limit) || 10, 1); // Default: 10
  const offset = Math.max(parseInt(query.offset) || 0, 0); // Default: 0

  return { limit, offset };
};

const setPaginationHeaders = (res, { total, limit, offset }) => {
  res.set("X-Total-Count", total);
  res.set("X-Limit", limit);
  res.set("X-Offset", offset);
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP
  message: "Too many requests, try again later.",
});

module.exports = { buildPaginationQuery, setPaginationHeaders, limiter };
