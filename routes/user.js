const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getOneUser);

router.put('/:id', userController.editUser);

router.patch('/:id', userController.upgradeUserToOwner);

router.patch('/password/:id', userController.changePassword);

router.patch('/username/:id', userController.changeUsername);

router.delete('/:id', userController.deleteUser);


module.exports = router;