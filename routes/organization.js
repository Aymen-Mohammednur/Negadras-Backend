const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

router.get('/', organizationController.getAllOrganizations);

router.get('/:userId', organizationController.getOrgByUserId);

router.post('/', organizationController.postOrganization);

router.patch('/:id', organizationController.editOrganization);

router.delete('/:id', organizationController.deleteOrganization);

module.exports = router;