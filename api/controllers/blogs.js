const Blog = require("../models/Blog");

async function index(req, res) {
  try {
    const blogs = await Blog.all;
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function show(req, res) {
  try {
    const blog = await Blog.findById(parseInt(req.params.id));
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ err });
  }
}

async function create(req, res) {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(422).json({ err });
  }
}

module.exports = {
  index,
  show,
  create,
};
