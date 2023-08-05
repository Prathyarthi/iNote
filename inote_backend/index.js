const authRouter = require('./routes/auth');
const authNotes = require('./routes/notes');

const dbConn = require('./db');
const express = require('express')

dbConn();

const app = express();
const port = 3000


//Available Routes
app.use('/api/auth', authRouter);
// app.use('/api/notes', authNotes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})