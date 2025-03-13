const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    balance: { type: Number, default: 1000 },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
