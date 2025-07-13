module.exports = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} -`, err);

  res.status(err.status || 500).json({
    success: false, // ✅ Must be included
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
