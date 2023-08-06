const notesModel = require("../models/notesSchema");
const fetchuser = require('../middleware/fetchuser');

// To fetch all notes of the user who has logged in
const fetchAllNotes = async(req, res) => {  
    const notes = await notesModel.find({ user: req.user.id });
    res.json(notes)
}

module.exports = {
    fetchAllNotes
}