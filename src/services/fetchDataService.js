const axios = require("axios");
const Event = require("../models/Event");

exports.fetchLiveData = async () => {
    try {
        console.log("Fetching live event data...");

        const response = await axios.get("https://api.mocksportsdata.com/events");
        const events = response.data;

        for (const eventData of events) {
            await Event.findOneAndUpdate(
                { name: eventData.name },
                {
                    category: eventData.category,
                    odds: eventData.odds,
                    isLive: eventData.isLive
                },
                { upsert: true, new: true }
            );
        }

        console.log("Live events updated");
    } catch (error) {
        console.error("Error fetching live data:", error);
    }
};
