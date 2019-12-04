"use strict";
const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");

router.get("/", async (req, res) => {
    let logs = logger.getLogEntries();
    console.log(logs);
    return res.status(200).send(logs);
});

module.exports = router;