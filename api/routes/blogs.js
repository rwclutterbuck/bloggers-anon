const express = require("express");
const router = express.Router();
const booksController = require("../controllers/blogs");

router.get("/", booksController.index);
router.get("/:year", booksController.showByYr);
router.get("/:year-:month", booksController.showByMonth);
router.get("/:year-:month-:day", booksController.showByDay);
router.get("/:year-:month-:day/:id", booksController.showBlog);
router.post("/", booksController.create);
router.patch("/", booksController.update);

module.exports = router;
