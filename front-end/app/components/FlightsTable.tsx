"use client";

import { useEffect, useState } from "react";
import { Table, Spinner, Alert, Pagination, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function FlightsTable() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;
  const router = useRouter(); // ✅ Used for navigation

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/flights");
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to fetch flights.");

        setFlights(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // Pagination logic
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);
  const totalPages = Math.ceil(flights.length / flightsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Flights</h2>

      {/* Display Flights */}
      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <>
          <Table striped bordered hover responsive>
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Airline</th>
                <th>Price (USD)</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Duration</th>
                <th>Route</th>
                <th>Action</th> {/* ✅ New Column for Details Button */}
              </tr>
            </thead>
            <tbody>
              {currentFlights.map((flight: any, index: number) => (
                <tr key={index}>
                  <td>{indexOfFirstFlight + index + 1}</td>
                  <td>{flight.airline}</td>
                  <td>${flight.price}</td>
                  <td>{flight.departure}</td>
                  <td>{flight.arrival}</td>
                  <td>{flight.duration}</td>
                  <td>{flight.route}</td>
                  <td>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => router.push(`/flights/${flight.id}`)} // ✅ Navigate to details page
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <Pagination className="justify-content-center">
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </div>
  );
}