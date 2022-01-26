const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, favoriteController.addToFavorites);

router.delete("/", verifyToken, favoriteController.removeFromFavorites);

module.exports = router;
