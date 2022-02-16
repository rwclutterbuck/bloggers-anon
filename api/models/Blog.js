const db = require("../dbConfig/init");

const Fingerprint = require("./Fingerprint");

class Blog {
  constructor(data) {
    (this.id = data.id),
      (this.title = data.title),
      (this.author = data.author),
      (this.content = data.content),
      (this.year = data.year),
      (this.month = data.month),
      (this.day = data.day),
      (this.route = `/blogs/${data.id}`);
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        let blogData = await db.query(`SELECT * FROM blogs;`);
        let blogs = blogData.rows.map((b) => new Blog(b));
        resolve(blogs);
      } catch (err) {
        reject("Blogs not found");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let blogData = await db.query(`SELECT * FROM blogs WHERE id=$1;`, [id]);
        let blog = new Blog(blogData);
        resolve(blog);
      } catch (err) {
        reject("Blogs not found");
      }
    });
  }

  // static get byYear(year) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let blogData = await db.query(`SELECT * FROM blogs WHERE year = $1;`, [year]);
  //       let blogs = blogData.rows.map((b) => new Blog(b));
  //       resolve(blogs);
  //     } catch (err) {
  //       reject("Blogs not found");
  //     }
  //   });
  // }

  static create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let blog = await db.query(
          `INSERT INTO blogs (title, author, content, year, month, day)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
          [
            data.title,
            data.author,
            data.content,
            data.year,
            data.month,
            data.day,
          ]
        );
        let newBlog = new Blog(blog);
        resolve(newBlog);
      } catch (err) {
        reject("Blogs not found");
      }
    });
  }
}
