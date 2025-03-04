"use client";

import { useEffect, useState } from "react";
import { Table, Spinner, Alert, Pagination, Form, Row, Col } from "react-bootstrap";

export default function FlightsTable() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;

  // Filter States
  const [selectedAirline, setSelectedAirline] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [departureFilter, setDepartureFilter] = useState("");
  const [arrivalFilter, setArrivalFilter] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/flights");
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to fetch flights.");

        setFlights(data.data);
        setFilteredFlights(data.data); // Initialize filtered flights
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // Filter Flights
  useEffect(() => {
    let filtered = flights;

    if (selectedAirline) {
      filtered = filtered.filter((flight) => flight.airline === selectedAirline);
    }

    if (maxPrice) {
      filtered = filtered.filter((flight) => flight.price <= parseInt(maxPrice));
    }

    if (departureFilter) {
      filtered = filtered.filter((flight) => flight.departure.includes(departureFilter));
    }

    if (arrivalFilter) {
      filtered = filtered.filter((flight) => flight.arrival.includes(arrivalFilter));
    }

    setFilteredFlights(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedAirline, maxPrice, departureFilter, arrivalFilter, flights]);

  // Pagination logic
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Flights</h2>

      {/* Filters Section */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Filter by Airline</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedAirline(e.target.value)} value={selectedAirline}>
              <option value="">All Airlines</option>
              {Array.from(new Set(flights.map((flight) => flight.airline))).map((airline, index) => (
                <option key={index} value={airline}>
                  {airline}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Max Price (USD)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter max price"
              onChange={(e) => setMaxPrice(e.target.value)}
              value={maxPrice}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Departure Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter departure"
              onChange={(e) => setDepartureFilter(e.target.value)}
              value={departureFilter}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Arrival Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter arrival"
              onChange={(e) => setArrivalFilter(e.target.value)}
              value={arrivalFilter}
            />
          </Form.Group>
        </Col>
      </Row>

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