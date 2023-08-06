const express = require('express');
const { signup , signin , getUser } = require("../controller/authController");
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const router = express.Router();


router.post("/signup", [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password' , "Password must be minimum 5 characters").isLength({min : 5}),
], signup);

router.post("/signin", [
    body('email', "Enter a valid email").isEmail(),
    body('password' , "Password must be minimum 5 characters").isLength({min : 5}),
], signin);

router.post("/getUser", fetchuser , getUser);

module.exports = router;