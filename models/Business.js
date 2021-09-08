const mongoose = require("mongoose");

const BusinessSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: 50,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    maxLength: 50,
  },
  phoneNumber: {
    type: String,
    maxLength: 15,
  },
  website: {
    type: String,
    maxLength: 100,
  },
  email: {
    type: String,
    maxLength: 100,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizations",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true
  },
});

module.exports = mongoose.model("Business", BusinessSchema);
