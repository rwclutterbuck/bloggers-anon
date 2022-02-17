const db = require("../dbConfig/init");

class Fingerprint {
  constructor(hash) {
    this.hash = hash;
  }

  checker() {
    return new Promise(async (resolve, reject) => {
      try {
        let printData = await db.query(
          `SELECT id FROM fingerprints WHERE hash = $1;`,
          [this.hash]
        );
        if (!printData.rows[0]) {
          await db.query(
            `INSERT INTO fingerprints (hash)
          VALUES ($1)`,
            [this.hash]
          );
          resolve(false);
        } else {
          let result = await db.query(
            `SELECT blogs.id FROM blogs
                                        JOIN fingerprints ON blogs.fingerprint_id=fingerprints.id
                                        WHERE fingerprints.hash = $1`,
            [this.hash]
          );
          if (!!result.rows[0]) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  // ---------------- ONLY CHECKS IF EXISTS BUT DOESN'T ADD TO DB -------------------------
  // checker() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let printData = await db.query(
  //         `SELECT id FROM fingerprints WHERE hash = $1;`,
  //         [this.hash]
  //       );
  //       if (!printData.rows[0]) {
  //         await db.query(
  //           `INSERT INTO fingerprints (hash)
  //         VALUES ($1)`,
  //           [this.hash]
  //         );
  //         resolve(false);
  //       } else {
  //         resolve(true);
  //       }
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }
}

module.exports = Fingerprint;
