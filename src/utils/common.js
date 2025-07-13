exports.buildPaginationQuery = (query) => {
  const limit = Math.max(parseInt(query.limit) || 10, 1); // Default: 10
  const offset = Math.max(parseInt(query.offset) || 0, 0); // Default: 0

  return { limit, offset };
};

exports.setPaginationHeaders = (res, { total, limit, offset }) => {
  res.set("X-Total-Count", total);
  res.set("X-Limit", limit);
  res.set("X-Offset", offset);
};
