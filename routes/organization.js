const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

router.get('/', organizationController.getAllOrganizations);

router.get('/:id', organizationController.getOneOrganization);

router.post('/', organizationController.postOrganization);

router.put('/:id', organizationController.editOrganization);

router.delete('/:id', organizationController.deleteOrganization);

module.exports = router;