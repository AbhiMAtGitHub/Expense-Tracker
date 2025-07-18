// src/controllers/report.controller.js
const {
  getMonthlySummary,
  getYearlySummary,
} = require("../services/report.service");

exports.monthly = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year);
    if (!year || year < 1970 || year > 2100) {
      return res.status(400).json({ message: "Invalid or missing year" });
    }

    const category = req.query.category;
    const data = await getMonthlySummary(req.user, year, category);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.yearly = async (req, res, next) => {
  try {
    const category = req.query.category;
    const data = await getYearlySummary(req.user, category);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
