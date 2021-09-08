const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController')


// USING ASYNC
router.post('/', reviewController.postReview);

router.get('/', reviewController.getAllReview);

router.patch('/:id', reviewController.patchReview);

router.put('/:id', reviewController.editReview);

router.delete('/:id', reviewController.deleteReview);


module.exports = router;