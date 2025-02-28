"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

export default function FlightDetails() {
  const { id } = useParams();
  const [flight, setFlight] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/flights`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to fetch flight details.");

        const selectedFlight = data.data[id];

        if (!selectedFlight) throw new Error("Flight not found.");

        setFlight(selectedFlight);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  return (
    <Container className="mt-5">
      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {flight && (
        <Row className="align-items-center">
          {/* Flight Details on Left */}
          <Col md={6}>
            <Card className="shadow p-4">
              <Card.Body>
                <h2 className="text-primary">{flight.airline} Flight Details</h2>
                <p><strong>Price:</strong> ${flight.price}</p>
                <p><strong>Departure:</strong> {flight.departure}</p>
                <p><strong>Arrival:</strong> {flight.arrival}</p>
                <p><strong>Duration:</strong> {flight.duration}</p>
                <p><strong>Route:</strong> {flight.route}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="text-center">
            <img
              src="/images/flight.jpg"
              alt="Flight Image"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}