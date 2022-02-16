const Blog = require("../models/Blog");

const dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

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
    const data = req.body;
    let date = dayjs()
      .format("DD/MM/YYYY HH:mm:ss")
      .split(" ")[0]
      .toString()
      .split("/");
    data.year = parseInt(date[2]);
    data.month = parseInt(date[1]);
    data.day = parseInt(date[0]);
    const blog = await Blog.create(data);
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
