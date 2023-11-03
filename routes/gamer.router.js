const express = require("express");
const router = express.Router();

const validateNameMiddleware = require("../validations/validateName.js");

const GamerController = require("../controllers/GamerController.js");

router.get("/", (res, req) => {
	res.send("Hello");
});

router.post("/gamer", validateNameMiddleware, GamerController.createGamer);

router.get("/gamers", GamerController.getLeaders);

router.put("/update", GamerController.update);

module.exports = router;
