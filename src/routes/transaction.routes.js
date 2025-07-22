const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const transactionController = require('../controllers/transaction.controller');

router.use(authMiddleware);

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getAll);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.remove);

module.exports = router;
