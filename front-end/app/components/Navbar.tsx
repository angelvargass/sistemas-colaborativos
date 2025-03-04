import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Flight Booking</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} href="/flights">Flights</Nav.Link>
          <Nav.Link as={Link} href="/reports">Reports</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}