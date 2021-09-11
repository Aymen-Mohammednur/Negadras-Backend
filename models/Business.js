const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("custom-mongoose-fuzzy-searching");

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
    default: null
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true
  },
});

BusinessSchema.plugin(mongoose_fuzzy_searching, { fields: ['name', 'location', 'phoneNumber', 'website', 'email'] });

module.exports = mongoose.model("Business", BusinessSchema);
