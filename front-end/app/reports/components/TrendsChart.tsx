import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TrendsChart({ data }) {
  const chartData = {
    labels: data.mostBookedAirlines.map(row => row._id),
    datasets: [
      {
        label: "Total Bookings",
        data: data.mostBookedAirlines.map(row => row.totalBookings),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <Card className="mb-4 p-3">
      <h4>Most Booked Airlines</h4>
      <Pie data={chartData} />
    </Card>
  );
}