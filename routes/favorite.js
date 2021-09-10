const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', favoriteController.addToFavorites);

router.delete('/:id', favoriteController.removeFromFavorites);


module.exports = router;