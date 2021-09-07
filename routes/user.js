const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getOneUser);

router.put('/:id', userController.editUser);

router.patch('/:id', userController.upgradeUserToOwner);

router.delete('/:id', userController.deleteUser);


module.exports = router;