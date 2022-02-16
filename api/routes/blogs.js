const express = require("express");
const router = express.Router();
const booksController = require("../controllers/blogs");

router.get("/", booksController.index);
router.get("/:id", booksController.show);
router.post("/", booksController.create);

// ------------------- SET UP CRUD ROUTES -------------------------
// router.patch("/", booksController.update);
// router.delete("/:year-:month-:day/:id", booksController.destroy);

// -------- SET UP ROUTES INCASE WE INCLUDE QUERYING BY DATE -------
// router.get("/:year", booksController.showByYr);
// router.get("/:year-:month", booksController.showByMonth);
// router.get("/:year-:month-:day", booksController.showByDay);

module.exports = router;
