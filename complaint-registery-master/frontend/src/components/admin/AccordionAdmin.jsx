import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Footer from '../common/FooterC';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';






const AccordionAdmin = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);


  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear auth tokens/localStorage
    localStorage.removeItem('token');

    // Navigate to Home component
    navigate('/');
  };




  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8000/status');
        setComplaintList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getAgentsRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/AgentUsers');
        setAgentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getComplaints();
    getAgentsRecords();
  }, []);

  const handleSelection = async (agentId, complaintId, status, agentName) => {
    try {
      await axios.get(`http://localhost:8000/AgentUsers/${agentId}`);
      const assignedComplaint = { agentId, complaintId, status, agentName };
      await axios.post('http://localhost:8000/assignedComplaints', assignedComplaint);
      const updatedComplaintList = complaintList.filter((c) => c._id !== complaintId);
      setComplaintList(updatedComplaintList);
      alert(`Complaint assigned to Agent ${agentName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Embedded CSS for purple header */}
    
  {/* Embedded CSS for custom accordion styles */}
  <style>{`
    .accordion-purple-header {
      display: block;
      width: 100%;
      background-color: rgb(197, 168, 215);
      color: white;
      padding: 10px 16px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 1.1rem;
      text-align: left;
    }

    .accordion-item {
      border: none !important;
      background-color: transparent !important;
    }

    .accordion-button {
      background-color: transparent !important;
      color: #333 !important;
      border: none !important;
      box-shadow: none !important;
    }

    .accordion-button:not(.collapsed) {
      background-color: #f4ecff !important;
      color: #000 !important;
    }

    .accordion-body {
      background-color: #f4ecff !important;
      border-top: 1px solid #d3cce3;
      padding: 1.25rem;
    }
  `}</style>

      {/* Navbar */}
      <Navbar fixed="top" style={{ backgroundColor: '#8960a3' }} variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="fw-bold text-white">Admin Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar"/>
          <Navbar.Collapse id="admin-navbar">
            <Nav className="ms-auto d-flex align-items-center gap-3">
              <Nav.Link href="#complaints" className="text-white">Complaints</Nav.Link>
              <Nav.Link href="#agents" className="text-white">Agents</Nav.Link>
            
               <Button
      className="text-white"
      style={{
        backgroundColor: 'transparent',
        border: '1px solid white',
        padding: '5px 12px',
        borderRadius: '5px'
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Content */}
      <div className="page-bg py-5 mt-5">
        <Container >
          <Accordion alwaysOpen className="mt-4 ">
            <Accordion.Item eventKey="0" >
              <Accordion.Header id="complaints" className='bg-red'>
                <span className="accordion-purple-header">Users Complaints</span>
              </Accordion.Header>
              <Accordion.Body style={{ background: '#f4ecff' }}>
                <div className="d-flex flex-wrap gap-4 justify-content-start">
                  {complaintList.length > 0 ? (
                    complaintList.map((complaint, index) => (
                      <Card key={index} className="shadow-sm" style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title className="text-dark">Name: {complaint.name}</Card.Title>
                          <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                          <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                          <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                          <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                          <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                          <Card.Text><b>Status:</b> {complaint.status}</Card.Text>

                          {complaint.status !== 'completed' && (
                            <Dropdown className="mt-2">
                              <Dropdown.Toggle variant="warning" size="sm">Assign</Dropdown.Toggle>
                              <Dropdown.Menu>
                                {agentList.map((agent, idx) => (
                                  <Dropdown.Item
                                    key={idx}
                                    onClick={() =>
                                      handleSelection(agent._id, complaint._id, complaint.status, agent.name)
                                    }
                                  >
                                    {agent.name}
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Menu>
                            </Dropdown>
                          )}
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <Alert variant="info" className="w-100 text-center">
                      <Alert.Heading>No complaints to show</Alert.Heading>
                    </Alert>
                  )}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header id="agents">
                <span className="accordion-purple-header">Agents</span>
              </Accordion.Header>
              <Accordion.Body style={{ background: '#f4ecff' }}>
                <div className="d-flex flex-wrap gap-4 justify-content-start">
                  {agentList.length > 0 ? (
                    agentList.map((agent, index) => (
                      <Card key={index} className="shadow-sm" style={{ width: '22rem' }}>
                        <Card.Body>
                          <Card.Title className="text-dark">Name: {agent.name}</Card.Title>
                          <Card.Text><b>Email:</b> {agent.email}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <Alert variant="info" className="w-100 text-center">
                      <Alert.Heading>No Agents to show</Alert.Heading>
                    </Alert>
                  )}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AccordionAdmin;
