const express = require('express');
const { something } = require("../controller/authController");
const router = express.Router();

router.get("/", something)

module.exports = router;