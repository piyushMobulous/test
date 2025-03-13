const Trade = require("../models/Trade");

exports.setupSockets = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected");

        socket.on("place_trade", async (data) => {
            try {
                const newTrade = new Trade(data);
                await newTrade.save();
                io.emit("trade_update", newTrade);
            } catch (error) {
                console.error("Error handling trade:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};
