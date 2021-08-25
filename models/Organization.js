const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    businessId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Buisness',
    },
});


module.exports = mongoose.model('Organizations', OrganizationSchema);