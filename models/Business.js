const mongoose = require('mongoose');

const BuisnessSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: 50
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        maxLength: 50
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        maxLength: 50,
    },
    phoneNumber: {
        type: String,
        maxLength: 15
    },
    website: {
        type: String,
        maxLength: 100
    },
    email: {
        type: String,
        maxLength: 100
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organizations',
    }
});


module.exports = mongoose.model('Buisness', BuisnessSchema);