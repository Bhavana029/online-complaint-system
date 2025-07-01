import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';
import './AgentHome.css';

const AgentHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [toggle, setToggle] = useState({});
  const [agentComplaintList, setAgentComplaintList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const { _id, name } = user;
          setUserName(name);
          const response = await axios.get(`http://localhost:8000/allcomplaints/${_id}`);
          setAgentComplaintList(response.data);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [navigate]);

  const handleStatusChange = async (complaintId) => {
    try {
      await axios.put(`http://localhost:8000/complaint/${complaintId}`, { status: 'completed' });
      setAgentComplaintList((prev) =>
        prev.map((c) =>
          c._doc.complaintId === complaintId
            ? { ...c, _doc: { ...c._doc, status: 'completed' } }
            : c
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      {/* Navbar */}
      <Navbar fixed="top" className="purple-navbar" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="fw-bold">Hi Agent {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto d-flex align-items-center gap-3">
              <NavLink to="#" className="nav-link text-white">
                View Complaints
              </NavLink>
              <span
                className="nav-link logout-link"
                onClick={LogOut}
                role="button"
                style={{ cursor: 'pointer' }}
              >
                Log out
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content */}
      <div className="page-bg" style={{ backgroundImage: `url('bg.jpg')` }}>
        <Container className="py-4">
          <div className="row g-4">
            {agentComplaintList && agentComplaintList.length > 0 ? (
              agentComplaintList.map((complaint, index) => {
                const open = toggle[complaint._doc.complaintId] || false;
                return (
                  <div key={index} className="col-lg-4 col-md-6 col-12">
                    <Card className="shadow-sm purple-card h-100">
                      <Card.Body>
                        <Card.Title className="purple-text">
                          <b>Name:</b> {complaint.name}
                        </Card.Title>
                        <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                        <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                        <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                        <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                        <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                        <Card.Text><b>Status:</b> {complaint._doc.status}</Card.Text>

                        {complaint._doc.status !== 'completed' && (
                          <Button
                            onClick={() => handleStatusChange(complaint._doc.complaintId)}
                            className="btn-purple me-2"
                            size="sm"
                          >
                            Mark as Completed
                          </Button>
                        )}
                        <Button
                          onClick={() => handleToggle(complaint._doc.complaintId)}
                          variant="outline-secondary"
                          size="sm"
                        >
                          {open ? 'Hide Chat' : 'Message'}
                        </Button>

                        <Collapse in={open}>
                          <div className="mt-3">
                            <Card body style={{ width: '100%' }}>
                              <ChatWindow
                                key={complaint._doc.complaintId}
                                complaintId={complaint._doc.complaintId}
                                name={userName}
                              />
                            </Card>
                          </div>
                        </Collapse>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            ) : (
              <Alert variant="info" className="w-100 text-center">
                <Alert.Heading>No complaints to show</Alert.Heading>
              </Alert>
            )}
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default AgentHome;
