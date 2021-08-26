const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// USING ASYNC
router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getOneUser);

router.patch('/:id', userController.editUser);

router.delete('/:id', userController.deleteUser);


module.exports = router;