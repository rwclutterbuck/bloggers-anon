const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs");

router.get("/", blogsController.index);
router.get("/:id", blogsController.show);
router.post("/", blogsController.create);
router.patch("/:id", blogsController.edit);
router.delete("/:id", blogsController.destroy);

module.exports = router;
