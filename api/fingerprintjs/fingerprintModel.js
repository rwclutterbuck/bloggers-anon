const db = require("../dbConfig/init");
const Blog = require("../models/Blog");

class Fingerprint {
  constructor(hash) {
    this.hash = hash;
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const printData = await db.query(
          `SELECT hash FROM fingerprints WHERE id=$1;`,
          [id]
        );
        const print = new Fingerprint(printData.rows[0]);
        resolve(print);
      } catch (err) {
        reject("No user with given id");
      }
    });
  }

  get blogs() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = db.query(
          `SELECT * FROM blogs WHERE fingerprint_id=$1;`,
          [this.id]
        );
        const blogs = result.rows.map((blog) => new Blog(blog));
        resolve(blogs);
      } catch (err) {
        reject("Could not find blogs for fingerprint");
      }
    });
  }

  static create(hash) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.query(
          `INSERT INTO ingerprints (hash)
                        VALUES ($1);`,
          [hash]
        );
        resolve("Fingerprint added to the db");
      } catch (err) {
        reject("Fingerprint could not be added to the db");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `DELETE FROM fingerprints WHERE id = $1;`,
          [this.id]
        );
        resolve(`Fingerprint was deleted`);
      } catch (err) {
        reject("Fingerprint could not be deleted");
      }
    });
  }

  checker() {
    return new Promise(async (resolve, reject) => {
      try {
        let printData = await db.query(
          `SELECT id FROM fingerprints WHERE hash = $1;`,
          [this.hash]
        );
        if (!printData.rows[0]) {
          resolve(false);
        } else {
          resolve(true);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

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
  //         let result = await db.query(
  //           `SELECT blogs.id FROM blogs
  //                                       JOIN fingerprints ON blogs.fingerprint_id=fingerprints.id
  //                                       WHERE fingerprints.hash = $1`,
  //           [this.hash]
  //         );
  //         if (!!result.rows[0]) {
  //           resolve(true);
  //         } else {
  //           resolve(false);
  //         }
  //       }
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }
}

module.exports = Fingerprint;
