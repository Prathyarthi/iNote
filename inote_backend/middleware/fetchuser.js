var jwt = require('jsonwebtoken');
const JWT_SECRET = "IamGoo$";

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add the id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        // next() is used so that getuser function gets called next
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }



}

module.exports = fetchuser;