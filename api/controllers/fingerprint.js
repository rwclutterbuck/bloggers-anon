import FingerprintJS from "@fingerprintjs/fingerprintjs";

const Fingerprint = require("../models/Fingerprint");

async function correctFingerprint(req, res) {
  try {
    const fpPromise = FingerprintJS.load();
    (async () => {
      const fp = await fpPromise;
      const result = await fp.get();
      // console.log(result.visitorId);
    })();

    const fingerprint = new Fingerprint(result.visitorId);
    const boolean = fingerprint.checker();
    res.json({ access: boolean });
  } catch (err) {
    res.status().json({ err });
  }
}

module.exports = {
  correctFingerprint,
};
