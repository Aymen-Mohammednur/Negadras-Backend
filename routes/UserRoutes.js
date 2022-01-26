const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require("../middlewares/verifyToken");

router.get('/', verifyToken, userController.getAllUsers);

router.post('/claim', verifyToken, userController.makeClaim);

router.get('/:id', verifyToken, userController.getOneUser);

router.put('/:id', verifyToken, userController.editUser);

router.patch('/:id', verifyToken, userController.upgradeUserToOwner);

router.patch('/password/:id', verifyToken, userController.changePassword);

router.patch('/username/:id', verifyToken, userController.changeUsername);

router.delete('/:id', verifyToken, userController.deleteUser);


module.exports = router;