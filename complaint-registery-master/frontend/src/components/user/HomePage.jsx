import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Complaint from '../user/Complaint';
import Status from '../user/Status';
import Footer from '../common/FooterC';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('Complaint');
  const [userName, setUserName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
    setMenuOpen(false); // close menu on small screen
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Custom Responsive Navbar */}
      <nav className="custom-navbar">
        <div className="navbar-left">Hi, {userName}</div>
        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
          <button
            className={activeComponent === 'Complaint' ? 'active' : ''}
            onClick={() => handleNavLinkClick('Complaint')}
          >
            Complaint Register
          </button>
          <button
            className={activeComponent === 'Status' ? 'active' : ''}
            onClick={() => handleNavLinkClick('Status')}
          >
            Status
          </button>
          <button onClick={Logout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-grow-1 py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="complaint-card">
                {activeComponent === 'Complaint' && <Complaint />}
                {activeComponent === 'Status' && <Status />}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
