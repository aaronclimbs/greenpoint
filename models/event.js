const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  category: { type: String, required: true },
  added: Boolean
});

const events = mongoose.model("Event", eventsSchema);

module.exports = events;