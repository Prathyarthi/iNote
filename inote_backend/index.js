const authRouter = require('./routes/auth');
const authNotes = require('./routes/notes');
require("dotenv").config();

const dbConn = require('./db');
const express = require('express')

dbConn();

const app = express();
const PORT = process.env.PORT || 5001

// To access req.body, we have to use this
app.use(express.json());


//Available Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', authNotes);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
})