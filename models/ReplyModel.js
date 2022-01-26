const mongoose = require('mongoose');

const ReplySchema = mongoose.Schema({
    replyText: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews',
        required: true
    },
});


module.exports = mongoose.model('Reply', ReplySchema);