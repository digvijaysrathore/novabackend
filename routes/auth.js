const express = require("express");
const router = express.Router();
const {signup, signin} = require("../controllers/auth");
const {check, validationResult} = require("express-validator");

router.post("/join", [
    check("email", "email is required").isEmail,
    check("password", "password should be atleast 4 characters").isLength({min: 4})
],
 signup
);

router.post("/login", signin);

module.exports = router;