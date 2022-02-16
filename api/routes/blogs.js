const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs");

router.get("/", blogsController.index);
router.get("/:id", blogsController.show);
router.post("/", blogsController.create);

// ------------------- SET UP CRUD ROUTES -------------------------
// router.patch("/", blogsController.update);
// router.delete("/:year-:month-:day/:id", blogsController.destroy);

// -------- SET UP ROUTES INCASE WE INCLUDE QUERYING BY DATE -------
// router.get("/:year", blogsController.showByYr);
// router.get("/:year-:month", blogsController.showByMonth);
// router.get("/:year-:month-:day", blogsController.showByDay);

module.exports = router;
