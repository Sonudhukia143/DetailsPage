import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';
import { useState } from 'react';

export default function Sidebar() {
  const [active,setActive] = useState(null);

  const currentPage = (page) => setActive(page);

  return (
    <div className="main">
      <Nav defaultActiveKey="/details" className="flex-column">
        <Nav.Link onClick={() => (currentPage('details'))} as={Link} to="/details" className={`${active == 'details' ? 'active custom-nav-link' : 'custom-nav-link'}`}>
          Details
        </Nav.Link>
        <Nav.Link onClick={() => (currentPage('profile'))} as={Link} to="/details/profile" className={`${active == 'profile' ? 'active custom-nav-link' : 'custom-nav-link'}`}>
          Profile
        </Nav.Link>
      </Nav>
    </div>
  );
}
