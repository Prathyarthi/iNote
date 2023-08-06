const express = require('express');
const { fetchAllNotes } = require("../controller/notesController");
const fetchuser = require('../middleware/fetchuser');
var router = express.Router();

router.get('/fetchAllNotes',fetchuser, fetchAllNotes);


module.exports = router;