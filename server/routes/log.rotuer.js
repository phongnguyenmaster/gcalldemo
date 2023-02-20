const express = require('express')
const logController = require('../controller/logController')
const router = express.Router()

router.get('/getAll', logController.getAll);
router.post('/addLog', logController.addLog);

module.exports = router