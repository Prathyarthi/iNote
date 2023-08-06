const { validationResult } = require("express-validator/src");
const userModel = require("../models/userSchema");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// const JWT_SECRET = "IamGoo$";


const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // To check whether the email already exists
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: "Sorry, a user with this email already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        // Creating a user (if no errors) and saving it to the database
        user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authToken });

        await user.save();
        res.send(user);
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}


// To authenticate a user
const signin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ errors: "Please login with valid credentials!" });
        }

        const passwordCompare = bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ errors: "Please login with valid credentials!" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authToken });

    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

// To get loggedin user details
const getUser = async (req, res) => {
    try {
        // Through userId get the information of the user
        userId = req.user.id;
        // Find user by ID except the password
        const user = await userModel.findById(userId).select("-password");
        res.send(user);
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = {
    signup,
    signin,
    getUser
}