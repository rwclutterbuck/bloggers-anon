const db = require("../dbConfig/init");
const Fingerprint = require("../fingerprintjs/fingerprintModel");

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
        reject("Blog not found");
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

  update(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedBlogData = await db.query(
          `UPDATE blogs
            SET title=$1, content=$2, year=$3, month=$4, day=$5 
            WHERE id=$4
            RETURNING *;`,
          [data.title, data.content, data.year, data.month, data.day]
        );
        const updatedBlog = new Blog(updatedBlogData.rows[0]);
        resolve(updatedBlog);
      } catch (err) {
        reject("Blog could not be updated");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          `DELETE FROM blogs WHERE id=$1 RETURNING fingerprint_id;`,
          [this.id]
        );
        const fingerprint = await Fingerprint.findById(
          result.rows[0].fingerprint_id
        );
        const blogs = fingerprint.blogs;
        if (!blogs.length) {
          await fingerprint.destroy();
        }
        resolve("Blog has been deleted");
      } catch (err) {
        reject("Blogs could not be deleted");
      }
    });
  }
}

module.exports = Blog;
