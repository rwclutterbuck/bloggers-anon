const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs");

router.get("/", blogsController.index);
router.get("/:id", blogsController.show);
router.post("/", blogsController.create);

module.exports = router;
