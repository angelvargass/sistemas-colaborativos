import flightsData from "../available_flights.json" assert { type: "json" };

export const getFlights = async (req, res) => {
    try {
        const flightsWithIds = flightsData.map((flight, index) => ({ id: index, ...flight }));

        res.status(200).json({ success: true, data: flightsWithIds });
    } catch (error) {
        console.error("Error retrieving flight data:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};