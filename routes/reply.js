const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController');


// USING ASYNC
router.post('/', replyController.postReply);

router.get('/', replyController.getAllReply);

router.get('/:id', replyController.getOneReply)

router.put('/:id', replyController.editReply);

router.patch('/:id', replyController.patchReply);

router.delete('/:id', replyController.deleteReply);


module.exports = router;