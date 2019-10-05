const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userEventsSchema = new Schema({
  userID: { type: Number, required: true },
  actionID: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: String
});

const userEvents = mongoose.model("UserEvent", userEventsSchema);

module.exports = userEvents;
