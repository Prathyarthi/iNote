const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    user: {  // This is used so that only a particular user can see these notes done by him and no other person can see it
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// This is to make model through this Schema  
notesModel = mongoose.model('notes', notesSchema);
module.exports = notesModel;