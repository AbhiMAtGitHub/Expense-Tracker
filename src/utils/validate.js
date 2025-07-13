class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

const validateTransaction = (data) => {
  const { title, amount, type } = data;

  if (!title || typeof title !== "string") {
    throw new ValidationError("Title is required and must be a string");
  }
  if (typeof amount !== "number" || amount <= 0) {
    throw new ValidationError("Amount must be a positive number");
  }
  if (!["income", "expense"].includes(type)) {
    throw new ValidationError("Type must be income or expense");
  }
};

module.exports = {
  ValidationError,
  validateTransaction,
};
