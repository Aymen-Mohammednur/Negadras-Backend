const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const verifyToken = require('../middlewares/verifyToken');


router.post('/', verifyToken, businessController.postBusiness);

router.get('/', verifyToken, businessController.getBusiness);

router.get('/:id', verifyToken, businessController.getOneBusiness);

router.get('/filter/:category', verifyToken, businessController.getBusinessByCategory);

router.put('/:id', verifyToken, businessController.editBusiness);

router.delete('/:id', verifyToken, businessController.deleteBusiness);


module.exports = router;