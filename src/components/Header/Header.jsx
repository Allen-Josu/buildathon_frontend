import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar 
      expand="lg" 
      className="bg-zinc-800 border-b-2 border-gray-600 py-4"
    >
      <Container className="px-6">
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="text-white text-5xl font-bold hover:text-purple-500 transition-colors"
        >
          EDUBUDDY
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          className="border-white scale-125"
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-8">
            <Nav.Link 
              as={Link} 
              to="/notes"
              className="text-white hover:text-purple-500 transition-all font-medium text-xl relative group py-2"
            >
              Notes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Nav.Link>
            
            <Nav.Link 
              href="#grade-predictor"
              className="text-white hover:text-purple-500 transition-all font-medium text-xl relative group py-2"
            >
              Grade Predictor
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Nav.Link>
            
            <Nav.Link 
              href="#model-question-paper"
              className="text-white hover:text-purple-500 transition-all font-medium text-xl relative group py-2"
            >
              Model Question Paper
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link}
              to="/pyq"
              className="text-white hover:text-purple-500 transition-all font-medium text-xl relative group py-2"
            >
              PYQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Nav.Link>
            
            <Nav.Link 
              href="#attendance-calculator"
              className="text-white hover:text-purple-500 transition-all font-medium text-xl relative group py-2"
            >
              Attendance Calculator
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Nav.Link>
          </Nav>
          
          <Link to="/login">
            <Button 
              className="bg-white text-black hover:bg-purple-600 hover:text-white transition-colors px-6 py-3 rounded-full border-0 text-lg font-medium"
            >
              Login
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;