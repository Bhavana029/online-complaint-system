import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from '../../Images/images.jpg';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from './FooterC';
import Nav from 'react-bootstrap/Nav';

const Home = () => {
   return (
      <>
         {/* Navbar */}
         <Navbar expand="lg" style={{ backgroundColor: 'rgb(129, 82, 158)' }} variant="dark" className="shadow-sm">
            <Container>
               <Navbar.Brand as={Link} to="/" className="fw-bold">ComplaintCare</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                     <Nav.Link 
                        as={Link} 
                        to="/" 
                        className="text-white fw-semibold px-3"
                     >
                        Home
                     </Nav.Link>
                     <Nav.Link 
                        as={Link} 
                        to="/signup" 
                        className="text-white fw-semibold px-3"
                     >
                        SignUp
                     </Nav.Link>
                     <Nav.Link 
                        as={Link} 
                        to="/login" 
                        className="text-white fw-semibold px-3"
                     >
                        Login
                     </Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         {/* Split Page Layout */}
         <div className="d-flex flex-column flex-lg-row" style={{ height: '90vh' }}>
            
            {/* Left Side Image */}
            <div className="w-100 w-lg-50" style={{ flex: 1, overflow: 'hidden' }}>
               <img 
                  src={Image} 
                  alt="Complaint Management" 
                  style={{ 
                     width: '100%', 
                     height: '100%', 
                     objectFit: 'cover', 
                     padding: '30px' 
                  }} 
               />
            </div>

            {/* Right Side Text */}
            <div 
               className="w-100 w-lg-50 d-flex align-items-center justify-content-center pt-5 px-4" 
               style={{ flex: 1 }}
            >
               <div>
                  <p className="fs-3 fw-bold text-center text-lg-start text-dark">
                     <span style={{ color: '#6A0DAD' }}>Simplify Complaint Handling,</span><br />
                     <span className="text-secondary"> Build Stronger Communication With Our</span><br />
                     <span className="text-dark">Smart Issue Reporting Platform</span>
                  </p>
                  <div className="text-center text-lg-start">
                     <Link to="/login">
                        <Button 
                           className="mt-3 px-4 fw-semibold text-white"
                           style={{ backgroundColor: '#6A0DAD', border: 'none' }}
                        >
                           Submit a Complaint
                        </Button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </>
   );
};

export default Home;
