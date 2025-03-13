const User = require("../models/User");
const Trade = require("../models/Trade");
const Event = require("../models/Event");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

exports.getAllTrades = async (req, res) => {
    try {
        const trades = await Trade.find().populate("user event");
        res.json(trades);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trades", error });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { name, category, odds } = req.body;
        const newEvent = new Event({ name, category, odds });
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", newEvent });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};
