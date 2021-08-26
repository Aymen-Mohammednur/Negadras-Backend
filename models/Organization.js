const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    }
});


module.exports = mongoose.model('Organizations', OrganizationSchema);