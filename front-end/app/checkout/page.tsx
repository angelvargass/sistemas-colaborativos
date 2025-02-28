"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";

export default function Checkout() {
  const searchParams = useSearchParams();

  const flight = {
    flightId: searchParams.get("flightId"), // Capture flight ID
    airline: searchParams.get("airline"),
    price: searchParams.get("price"),
    departure: searchParams.get("departure"),
    arrival: searchParams.get("arrival"),
    duration: searchParams.get("duration"),
    route: searchParams.get("route"),
  };

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flight), // Include flightId in the request
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Payment failed");

      setPaymentSuccess(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow p-4">
            <Card.Body>
              <h2 className="text-center text-primary">Checkout</h2>

              {paymentSuccess && (
                <Alert variant="success" className="text-center">
                  🎉 Payment successful! Your flight has been booked.
                </Alert>
              )}

              {error && (
                <Alert variant="danger" className="text-center">
                  ❌ {error}
                </Alert>
              )}

              {!paymentSuccess && (
                <>
                  <h4 className="mt-3">{flight.airline} Flight</h4>
                  <p><strong>Route:</strong> {flight.route}</p>
                  <p><strong>Price:</strong> ${flight.price}</p>
                  <p><strong>Departure:</strong> {flight.departure}</p>
                  <p><strong>Arrival:</strong> {flight.arrival}</p>
                  <p><strong>Duration:</strong> {flight.duration}</p>

                  <hr />

                  <h5>Enter Payment Details</h5>
                  <Form>
                    <Form.Group>
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control type="text" placeholder="1234 5678 9101 1121" required />
                    </Form.Group>

                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control type="text" placeholder="MM/YY" required />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>CVV</Form.Label>
                          <Form.Control type="text" placeholder="123" required />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="success" className="mt-3 btn-block" onClick={handlePayment}>
                      Pay Now
                    </Button>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}