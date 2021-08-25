const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    role: {
        type: String,
        required: true,
        maxLength: 10
    }
});

// virtual for users fullName
UserSchema
.virtual('fullName')
.get(() => {
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('Users', UserSchema);