const { registerUser, loginUser } = require('../services/auth.service');
const { validateRegister, validateLogin } = require('../validators/user.validator');

exports.register = async (req, res, next) => {
  try {
    const error = validateRegister(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const result = await registerUser(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const error = validateLogin(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const result = await loginUser(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
