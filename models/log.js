const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logsSchema = new Schema({
  user_id: { type: Number, required: true },
  event_id: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: String
});

const logs = mongoose.model("Log", logsSchema);

module.exports = logs;
