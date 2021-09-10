const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const verifyToken = require('../middlewares/verifyToken');


// router.post('/', verifyToken, businessController.postBusiness);
router.post('/', businessController.postBusiness);

router.get('/', businessController.getBusiness);

router.get('/:id', businessController.getOneBusiness);

router.get('/filter/:categoryId/:userId', businessController.getBusinessByCategory);

router.put('/:id', businessController.editBusiness);

router.delete('/:id', businessController.deleteBusiness);

router.patch('/:id', businessController.addOrganizationToBusiness);


module.exports = router;