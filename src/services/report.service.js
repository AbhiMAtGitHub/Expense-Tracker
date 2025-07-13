const Transaction = require("../models/transaction.model");
const mongoose = require("mongoose");

exports.getMonthlySummary = async (userId, year) => {
  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year}-12-31`);

  const result = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $group: {
        _id: "$_id.month",
        breakdown: {
          $push: {
            type: "$_id.type",
            total: "$total",
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return result.map((entry) => ({
    month: entry._id,
    income: entry.breakdown.find((b) => b.type === "income")?.total || 0,
    expense: entry.breakdown.find((b) => b.type === "expense")?.total || 0,
  }));
};

exports.getYearlySummary = async (userId) => {
  const result = await Transaction.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $group: {
        _id: "$_id.year",
        breakdown: {
          $push: {
            type: "$_id.type",
            total: "$total",
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return result.map((entry) => ({
    year: entry._id,
    income: entry.breakdown.find((b) => b.type === "income")?.total || 0,
    expense: entry.breakdown.find((b) => b.type === "expense")?.total || 0,
  }));
};
