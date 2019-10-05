const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logsSchema = new Schema({
  userID: { type: Number, required: true },
  actionID: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: String
});

const logs = mongoose.model("Log", logsSchema);

module.exports = logs;
