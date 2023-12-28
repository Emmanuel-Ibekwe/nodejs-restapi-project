const express = require("express");
const router = express.Router();
const statusController = require("../controllers/status");
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, statusController.getStatus);

router.put("/update", isAuth, statusController.updateStatus);

module.exports = router;
