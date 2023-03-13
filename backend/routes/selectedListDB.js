const router = require("express").Router();

const controller = require("../controllers/SelectedListDBController");

router.post("/", controller.post);
router.get("/", controller.get);

module.exports = router