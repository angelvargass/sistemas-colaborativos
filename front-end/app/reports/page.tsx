"use client";

import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import RevenueChart from "./components/RevenueChart";
import TrendsChart from "./components/TrendsChart";
import FlightStats from "./components/FlightStats";

export default function ReportsPage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const urls = [
          "/api/reports/total-revenue",
          "/api/reports/revenue-by-airline",
          "/api/reports/most-booked-airlines",
          "/api/reports/most-popular-routes",
          "/api/reports/average-ticket-price",
          "/api/reports/longest-flights"
        ];
        const responses = await Promise.all(urls.map(url => fetch(`http://localhost:8080${url}`)));
        const results = await Promise.all(responses.map(res => res.json()));

        setData({
          totalRevenue: results[0].totalRevenue,
          revenueByAirline: results[1],
          mostBookedAirlines: results[2],
          mostPopularRoutes: results[3],
          averageTicketPrice: results[4],
          longestFlights: results[5]
        });
      } catch (err) {
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Flight Reports</h2>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <RevenueChart data={data} />
          <TrendsChart data={data} />
          <FlightStats data={data} />
        </>
      )}
    </Container>
  );
}