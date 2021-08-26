const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController')

// router.post('/', (request, response) => {
//     response.send("POST business");

//     console.log(request.body);

//     const business = new business(request.body);

//     business.save()
//     .then(data => {
//         response.status(200).json(data);
//     })
//     .catch(error => {
//         response.json({ message: error });
//     });

// });


// USING ASYNC
router.post('/', businessController.postBusiness);

router.get('/', businessController.getAllBusiness);

router.get('/:id', businessController.getOneBusiness);

router.get('/filter/:category', businessController.getBusinessByCategory);

router.put('/:id', businessController.editBusiness);

router.delete('/:id', businessController.deleteBusiness);


module.exports = router;