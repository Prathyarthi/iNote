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

const updateNote = async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Find the notes to updated and update it
        let note = await notesModel.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {         // To convert id which is object into string and compare
            return res.status(401).send("Not Allowed");
        }

        note = await notesModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

const deleteNote = async (req, res) => {
    try {
        // Find the notes to deleted and delete it
        let note = await notesModel.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if the user owns this note 
        if (note.user.toString() !== req.user.id) {         // To convert id which is object into string and compare
            return res.status(401).send("Not Allowed");
        }

        note = await notesModel.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note has been deleted!" });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = {
    fetchAllNotes,
    addNote,
    updateNote,
    deleteNote
}