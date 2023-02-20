const express = require('express')
const router = express.Router();
const logController = require("../controller/logController");

router.get("/logs/getall", logController.getAll);
router.post("/logs/addLog", logController.addLog);


module.exports = router;