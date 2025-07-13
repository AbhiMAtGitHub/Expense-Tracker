const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../services/transaction.service");
const {
  createMultipleTransactions,
} = require("../services/transaction.service");
const { setPaginationHeaders } = require("../utils/common");
const { validateTransaction } = require("../utils/validate");

exports.create = async (req, res, next) => {
  try {
    const payload = req.body;

    if (Array.isArray(payload)) {
      payload.forEach(validateTransaction);
    } else {
      validateTransaction(payload);
    }

    const userId = req.user;
    const data = Array.isArray(payload)
      ? await createMultipleTransactions(payload, userId)
      : await createTransaction(payload, userId);

    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { transactions, meta } = await getTransactions(req.user, req.query);

    setPaginationHeaders(res, meta);
    res.status(200).json({ success: true, data: transactions });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = await updateTransaction(req.params.id, req.body, req.user);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const data = await deleteTransaction(req.params.id, req.user);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
