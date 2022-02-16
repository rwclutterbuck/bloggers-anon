const db = require("../dbConfig/init");

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
        let blog = new Blog(blogData.rows[0]);
        resolve(blog);
      } catch (err) {
        reject("Blogs not found");
      }
    });
  }

  static create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let blogData = await db.query(
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
            // data.fingerprint_id,
          ]
        );
        let newBlog = new Blog(blogData.rows[0]);
        resolve(newBlog);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Blog;
