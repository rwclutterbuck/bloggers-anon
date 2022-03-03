const express = require("express");
const router = express.Router();
const fingerprintController = require("./fingerprints");

router.post("/", fingerprintController.correctFingerprint);

module.exports = router;
