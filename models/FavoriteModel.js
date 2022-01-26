const mongoose = require("mongoose");

const FavoriteSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Id is required"],
    maxLength: 50,
  },
  businessId: {
    type: String,
    required: [true, "Business Id is required"],
    maxLength: 50,
  },
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
