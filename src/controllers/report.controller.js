const {
  getMonthlySummary,
  getYearlySummary,
} = require("../services/report.service");

exports.monthly = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year);
    if (!year) return res.status(400).json({ message: "Year is required" });

    const data = await getMonthlySummary(req.user, year);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.yearly = async (req, res, next) => {
  try {
    const data = await getYearlySummary(req.user);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
