const express = require('express');
const { fetchAllNotes, addNote } = require("../controller/notesController");
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
var router = express.Router();

router.get('/fetchAllNotes', fetchuser, fetchAllNotes);
router.post('/addNote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "description must be minimum 5 characters").isLength({ min: 5 }),
], addNote);

module.exports = router;