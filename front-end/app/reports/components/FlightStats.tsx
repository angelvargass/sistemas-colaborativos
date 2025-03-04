import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function FlightStats({ data }) {
  const chartData = {
    labels: data.longestFlights.map(flight => `${flight.departure} → ${flight.arrival}`),
    datasets: [
      {
        label: "Flight Duration (minutes)",
        data: data.longestFlights.map(flight => parseInt(flight.duration, 10)),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <Card className="mb-4 p-3">
      <h4>Longest Flights</h4>
      <Line data={chartData} />
    </Card>
  );
}