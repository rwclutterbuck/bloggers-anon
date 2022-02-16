const express = require("express");
const router = express.Router();
const fingerprintController = require("../controllers/fingerprint");

router.get("/", fingerprintController.correctFingerprint);

module.exports = router;
