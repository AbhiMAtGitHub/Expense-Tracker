const Transaction = require('../models/transaction.model');
const { buildPaginationQuery } = require('../utils/common');

exports.createTransaction = async (body, userId) => {
  const { title, amount, type, category, date } = body;
  return await Transaction.create({
    title,
    amount,
    type,
    category,
    date,
    userId,
  });
};

exports.createMultipleTransactions = async (transactions, userId) => {
  const formatted = transactions.map((txn) => ({
    ...txn,
    userId,
  }));

  return await Transaction.insertMany(formatted);
};

exports.getTransactions = async (userId, query) => {
  const { limit, offset } = buildPaginationQuery(query);

  const filters = { userId };

  if (query.type) filters.type = query.type;
  if (query.category) filters.category = query.category;
  if (query.startDate && query.endDate) {
    filters.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate),
    };
  }

  const transactions = await Transaction.find(filters)
    .sort({ date: -1 })
    .skip(offset)
    .limit(limit);

  const total = await Transaction.countDocuments(filters);
  return { transactions, meta: { total, limit, offset } };
};

exports.updateTransaction = async (id, update, userId) => {
  const updated = await Transaction.findOneAndUpdate(
    { _id: id, userId },
    update,
    { new: true }
  );
  if (!updated)
    throw new Error('Transaction not found or you do not have permission.');
  return updated;
};

exports.deleteTransaction = async (id, userId) => {
  const deleted = await Transaction.findOneAndDelete({ _id: id, userId });
  if (!deleted)
    throw new Error('Transaction not found or you do not have permission.');
  return true;
};
