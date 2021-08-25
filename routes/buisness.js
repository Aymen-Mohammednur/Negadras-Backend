const express = require('express');
const router = express.Router();
const buisnessController = require('../controllers/buisnessController')

// router.post('/', (request, response) => {
//     response.send("POST buisness");

//     console.log(request.body);

//     const buisness = new Buisness(request.body);

//     buisness.save()
//     .then(data => {
//         response.status(200).json(data);
//     })
//     .catch(error => {
//         response.json({ message: error });
//     });

// });

// USING ASYNC
router.post('/', buisnessController.postBuisness);

router.get('/', buisnessController.getAllBuisness);

router.get('/:id', buisnessController.getOneBuisness);

router.patch('/:id', buisnessController.editBuisness);

router.delete('/:id', buisnessController.deleteBuisness);


module.exports = router;