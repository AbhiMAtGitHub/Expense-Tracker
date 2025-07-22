const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const controller = require('../controllers/report.controller');

router.use(authMiddleware);

router.get('/monthly', controller.monthly);
router.get('/yearly', controller.yearly);

module.exports = router;
