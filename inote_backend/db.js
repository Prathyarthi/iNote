const mongoose = require('mongoose');
const MONGO_URL = "mongodb+srv://prathyarti:mongo@cluster0.7ifjzfq.mongodb.net/inote?retryWrites=true&w=majority"

const dbConn = () => {
    mongoose
        .connect(MONGO_URL)
        .then((conn) => console.log(`Connected to ${conn.connection.host}`))
        .catch((e) => console.log(e.message));
};

module.exports = dbConn;