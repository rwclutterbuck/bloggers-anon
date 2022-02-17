const Fingerprint = require("./fingerprintModel");

async function correctFingerprint(req, res) {
  try {
    const hash = req.body.hash;
    const fingerprint = new Fingerprint(hash);
    const bool = await fingerprint.checker();
    res.json({ access: bool });
  } catch (err) {
    res.status().json({ err });
  }
}

module.exports = {
  correctFingerprint,
};
