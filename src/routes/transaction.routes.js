const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("../controllers/transaction.controller");

router.use(authMiddleware);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
