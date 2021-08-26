const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: 50
    },
});


module.exports = mongoose.model('Categories', CategorySchema);