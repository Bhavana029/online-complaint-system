import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from "./AccordionAdmin";
import AgentInfo from './AgentInfo';
import Footer from '../common/FooterC'; // Make sure Footer is styled too

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const { name } = user;
          setUserName(name);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f5f3ff' }}>
      {/* Navbar */}
      <Navbar expand="lg" style={{ background: 'linear-gradient(to right, #6a0dad, #9b59b6)' }} variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold text-white">👑 Admin Portal - {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <NavLink
                className={`nav-link text-white ${activeComponent === 'dashboard' ? 'fw-bold' : ''}`}
                onClick={() => handleNavLinkClick('dashboard')}
              >
                Dashboard
              </NavLink>
              <NavLink
                className={`nav-link text-white ${activeComponent === 'UserInfo' ? 'fw-bold' : ''}`}
                onClick={() => handleNavLinkClick('UserInfo')}
              >
                Users
              </NavLink>
              <NavLink
                className={`nav-link text-white ${activeComponent === 'Agent' ? 'fw-bold' : ''}`}
                onClick={() => handleNavLinkClick('Agent')}
              >
                Agents
              </NavLink>
            </Nav>
            <Button onClick={LogOut} variant="outline-light">Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <Container className="flex-grow-1 py-4">
        {activeComponent === 'dashboard' && <AccordionAdmin />}
        {activeComponent === 'UserInfo' && <UserInfo />}
        {activeComponent === 'Agent' && <AgentInfo />}
      </Container>

      
        <Footer />
    
    </div>
  );
};

export default AdminHome;
