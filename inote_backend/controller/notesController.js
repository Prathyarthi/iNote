const notesModel = require("../models/notesSchema");
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// To fetch all notes of the user who has logged in
const fetchAllNotes = async (req, res) => {
    try {
        const notes = await notesModel.find({ user: req.user.id });
        res.json(notes)
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

const addNote = async (req, res) => {
    const { title, description, tag } = req.body;     // Destructuring concept
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new notesModel({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }

}


module.exports = {
    fetchAllNotes,
    addNote
}