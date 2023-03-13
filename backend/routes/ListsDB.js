const router = require("express").Router();

const controller = require("../controllers/ListsDBController");

// router.post("/", controller.post);
router.get("/", controller.get);

module.exports = router