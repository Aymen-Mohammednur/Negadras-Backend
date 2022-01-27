const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


// USING ASYNC
router.get('/', reviewController.getAllReview);

router.get('/:businessId', reviewController.getReviewByBusiness);

router.post('/', reviewController.postReview);

router.patch('/:id', reviewController.patchReview);

router.put('/:id', reviewController.editReview);

router.delete('/:id', reviewController.deleteReview);



module.exports = router;