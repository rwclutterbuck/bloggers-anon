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
    data.year = dayjs().format("DD/MM/YYYY").toString().split("/")[2];
    data.month = dayjs().format("DD/MM/YYYY").toString().split("/")[1];
    data.day = dayjs().format("DD/MM/YYYY").toString().split("/")[0];
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
