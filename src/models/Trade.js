const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    amount: { type: Number },
    status: { type: String, enum: ["pending", "won", "lost"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Trade", tradeSchema);
