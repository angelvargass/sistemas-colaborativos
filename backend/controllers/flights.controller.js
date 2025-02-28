import flightsData from '../available_flights.json' assert { type: "json" };

export const getFlights = async (req, res) => {
    try {
        res.status(200).json({ success: true, data: flightsData });
    } catch (error) {
        console.error("Error retrieving flight data:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};