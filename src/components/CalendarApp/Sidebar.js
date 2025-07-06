import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <Nav className="flex-column bg-light vh-100 p-3">
            <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
            <Nav.Link as={Link} to="/matrix">Eisenhower Matrix</Nav.Link>
        </Nav>
    );
}
