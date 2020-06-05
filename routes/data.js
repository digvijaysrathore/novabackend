const express = require("express");
const router = express.Router();
const {push, pull, creds} = require("../controllers/data");

router.put("/push", creds, push);
router.get("/pull", creds, pull);

module.exports = router;