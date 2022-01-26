const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
});


module.exports = mongoose.model('Organizations', OrganizationSchema);