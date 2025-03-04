import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RevenueChart({ data }) {
  const chartData = {
    labels: data.revenueByAirline.map(row => row._id),
    datasets: [
      {
        label: "Revenue (USD)",
        data: data.revenueByAirline.map(row => row.totalRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <Card className="mb-4 p-3">
      <h4>Revenue by Airline</h4>
      <Bar data={chartData} />
    </Card>
  );
}