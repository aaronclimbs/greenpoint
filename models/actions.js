const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Number, required: true },
  points: { type: Number, required: true },
  added: Boolean
});

const actions = mongoose.model("Book", actionsSchema);

module.exports = actions;

