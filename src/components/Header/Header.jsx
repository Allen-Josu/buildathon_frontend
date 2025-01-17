import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar 
      expand="lg" 
      className="bg-zinc-800 border-b-2 border-gray-600 py-2"
    >
      <Container className="px-2">
        <Navbar.Brand 
          as={Link} 
          to="/" 
          style={{
            fontFamily: 'sans-serif',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '0.15rem',
          }}
        >
          EduBuddy
        </Navbar.Brand>
        
        {/* Fix for the toggle icon */}
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          className="border-white"
          style={{
            color: 'white',
            borderColor: 'white', // Ensure border is visible
          }}
        >
          <span className="navbar-toggler-icon"><i className="fas fa-bars" style={{ color: 'white', fontSize: '1.5rem' }}></i></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav" className="pl-4 sm:pl-4">
  <Nav 
    className="mx-auto space-y-2 lg:space-y-0 lg:gap-6 md:gap-4 sm:gap-2" // Adjust gap dynamically
  >
    {['Notes', 'Grade Predictor', 'Model Question Paper', 'PYQ', 'Attendance Calculator', 'About'].map((item, index) => (
      <Nav.Link 
        key={index}
        as={Link} 
        to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-white transition-all font-medium text-xl relative group py-2"
        style={{
          '--hover-color': '#6a0dad', // Default hover color
          transition: 'all 0.3s ease',
        }}
      >
        {item}
        <span 
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"
          style={{ backgroundColor: 'var(--hover-color)' }}
        ></span>
      </Nav.Link>
    ))}
  </Nav>

  <Link to="/login">
    <Button
      className="btn px-3 py-1"
      style={{
        backgroundColor: '#6a0dad', // Replace this with the user-defined color
        color: '#ffffff', // White text color
        border: 'none',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#ffffff'; // Slightly darker on hover
        e.target.style.color = '#000000'; // Keep text color white
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#6a0dad'; // Revert to user-defined color
        e.target.style.color = '#ffffff'; // Ensure text stays white
      }}
    >
      Login
    </Button>
  </Link>
</Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;
