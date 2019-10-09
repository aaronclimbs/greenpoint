const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logsSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref:"User", required: true },
  eventID: { type: Schema.Types.ObjectId, ref:"Event", required: true },
  date: { type: Date, default: Date.now },
  quantity: Number
});

const logs = mongoose.model("Log", logsSchema);

module.exports = logs;
