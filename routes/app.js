const express = require("express");
const router = express.Router();
const {add, push, get} = require("../controllers/app");

router.post("/add", add);
router.put("/pushdata", push);
router.get("/pulldata/:userkey", get);

module.exports = router;