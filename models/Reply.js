const mongoose = require('mongoose');

const ReplySchema = mongoose.Schema({
    replyText: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
    },
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews',
    },
});


module.exports = mongoose.model('Reply', ReplySchema);