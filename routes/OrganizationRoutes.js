const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const verifyToken = require("../middlewares/verifyToken");

router.get('/', verifyToken, organizationController.getAllOrganizations);

router.get('/:userId', verifyToken, organizationController.getOrgByUserId);

router.post('/', verifyToken, organizationController.postOrganization);

router.patch('/:id', verifyToken, organizationController.editOrganization);

router.delete('/:id', verifyToken, organizationController.deleteOrganization);

module.exports = router;