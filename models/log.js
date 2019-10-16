const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logsSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref:"User", required: true },
  eventCat: {type: String},
  eventName: {type: String},
  eventPoints: {type: Number},
  eventDate: {type: String},
  dateEntered: { type: Date, default: Date.now },
  eventQuantity: {type: Number},
  eventMonth: {type: Number},
  eventYear: {type: Number}
});

const logs = mongoose.model("Log", logsSchema);

module.exports = logs;