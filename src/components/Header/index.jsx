import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { useState } from 'react';
import ToastNotification from '../../modals/Toast';

export default function Header() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const [toastOpen, setToastOpen] = useState(false);  // State for controlling toast visibility
  const [toastMessage, setToastMessage] = useState('');  // State for the toast message
  
  const handleLogout = () => {
    clearUser();
    setToastMessage('Logout successful!');
    setToastOpen(true);
    // No redirect after logout, wait for the user to manually click login
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-zinc-800 border-b-2 border-gray-600 py-2">
        <Container className="mx-auto">
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              fontFamily: 'sans-serif',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '0.15rem',
              transition: 'color 0.3s ease', // Smooth transition for hover effect
            }}
            onMouseEnter={(e) => e.target.style.color = '#6d28d9'}
            onMouseLeave={(e) => e.target.style.color = 'white'}
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
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars" style={{ color: 'white', fontSize: '1.5rem' }}></i>
            </span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav" className="pl-4 sm:pl-4">
            <Nav className="mx-auto space-y-2 lg:space-y-0 lg:gap-6 md:gap-4 sm:gap-2">
              {['Notes', 'Grade Calculator', 'Model Question Paper', 'PYQ', 'Attendance Calculator', 'About'].map((item, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-white transition-all font-medium text-xl relative group py-2 mb-2"
                  style={{
                    '--hover-color': '#6d28d9', // Default hover color
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-[0.15em] bg-purple-500 transition-all group-hover:w-full"
                    style={{
                      backgroundColor: 'var(--hover-color)',
                      transition: 'width 0.3s ease, height 0.3s ease',
                    }}
                  ></span>
                </Nav.Link>
              ))}
            </Nav>
            {user ? (
              <Button
                className="btn px-3 py-1"
                style={{
                  backgroundColor: '#6d28d9', // Replace this with the user-defined color
                  color: '#ffffff', // White text color
                  border: 'none',
                  transition: 'all 0.3s ease',
                }}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ffffff'; // Slightly darker on hover
                  e.target.style.color = '#000000'; // Keep text color white
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6d28d9'; // Revert to user-defined color
                  e.target.style.color = '#ffffff'; // Ensure text stays white
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  className="btn px-3 py-1"
                  style={{
                    backgroundColor: '#6d28d9', // Replace this with the user-defined color
                    color: '#ffffff', // White text color
                    border: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ffffff'; // Slightly darker on hover
                    e.target.style.color = '#000000'; // Keep text color white
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#6d28d9'; // Revert to user-defined color
                    e.target.style.color = '#ffffff'; // Ensure text stays white
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Toast Notification Component */}
      <ToastNotification open={toastOpen} setOpen={setToastOpen} message={toastMessage} />
    </div>
  );
}
