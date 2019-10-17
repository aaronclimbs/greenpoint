const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    lat: {
      type: String
    },
    lng: {
      type: String
    },
    zip: {
      type: String
    },
    city: {
      type: String
    }
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
