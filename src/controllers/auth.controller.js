const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../services/auth.service');
const {
  validateRegister,
  validateLogin,
} = require('../validators/user.validator');
const Blacklist = require('../models/blacklist.model');

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

exports.logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'No token found' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return res.status(400).json({ message: 'Invalid token format' });
    }

    const expiresAt = new Date(decoded.exp * 1000);

    await Blacklist.create({ token, expiresAt });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error during logout' });
  }
};
