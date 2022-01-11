const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verifyToken = require("../middlewares/verifyToken");

router.get('/',verifyToken, categoryController.getAllCategories);

router.get('/:id', verifyToken, categoryController.getOneCategory);

router.post('/',verifyToken, categoryController.postCategory);

router.put('/:id', verifyToken, categoryController.editCategory);

router.delete('/:id', verifyToken, categoryController.deleteCategory);

module.exports = router;