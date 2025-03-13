const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: { type: String },
    category: { type: String },
    odds: { type: Number },
    isLive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
