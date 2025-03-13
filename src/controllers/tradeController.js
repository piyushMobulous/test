const Trade = require("../models/Trade");

exports.placeTrade = async (req, res) => {
    try {
        const { user, event, amount } = req.body;
        const trade = new Trade({ user, event, amount });
        await trade.save();
        res.status(201).json({ message: "Trade placed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Trade failed", error });
    }
};
