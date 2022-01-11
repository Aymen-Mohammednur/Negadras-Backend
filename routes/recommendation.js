const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const verifyToken = require("../middlewares/verifyToken");

router.get('/',verifyToken, recommendationController.getList);


module.exports = router;