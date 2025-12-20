const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  deviceStatus: {
    type: String,
    enum: ["ON", "OFF"],
    default: "OFF"
  },

  onAngle: {
    type: Number,
    default: 180
  },

  offAngle: {
    type: Number,
    default: 150
  },

  autoOffTime: {
    type: String
  },

  // 🕒 ESP32 running time
  currentTime: {
    type: String
  },

  // 🔑 push-button OFF command id
  offCommandId: {
    type: Number,
    default: 0
  },

  // 🆕 request ESP32 to send time ONCE
  requestTime: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Settings", settingsSchema);
