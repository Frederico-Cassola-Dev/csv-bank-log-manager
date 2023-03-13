const router = require("express").Router();


const controller = require("../controllers/ResumeController")

router.get("/", controller.get);

module.exports = router;