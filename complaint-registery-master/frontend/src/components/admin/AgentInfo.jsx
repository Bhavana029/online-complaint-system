import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  Table,
  Button,
  Collapse,
  Form,
  Alert,
} from 'react-bootstrap';
import Footer from '../common/FooterC';
import axios from 'axios';

const AgentInfo = () => {
  const navigate = useNavigate();
  const [ordinaryList, setOrdinaryList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [updateAgent, setUpdateAgent] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUpdateAgent({ ...updateAgent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (user_id) => {
    if (!updateAgent.name && !updateAgent.email && !updateAgent.phone) {
      alert('At least one field must be filled');
      return;
    }
    if (window.confirm('Are you sure you want to update the agent?')) {
      try {
        await axios.put(`http://localhost:8000/user/${user_id}`, updateAgent);
        alert('Agent updated successfully');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getOrdinaryRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/agentUsers');
        setOrdinaryList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrdinaryRecords();
  }, [navigate]);

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      try {
        await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
        setOrdinaryList(ordinaryList.filter((user) => user._id !== userId));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggle = (id) => {
    setToggle((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Purple Gradient Navbar */}
      <Navbar
        fixed="top"
        expand="lg"
        style={{
          background: 'linear-gradient(90deg, #6A0DAD 0%, #9F5FDC 100%)',
        }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand className="fw-bold text-white">Agent Info Panel</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/')} className="text-white">
              Home
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Body */}
      <div
        style={{
          backgroundColor: '#F3E8FF',
          minHeight: '100vh',
          paddingTop: '80px',
        }}
      >
        <Container className="py-4">
          <h3 className="text-center mb-4 text-purple fw-bold">
            Agent Details
          </h3>
          <Table bordered hover responsive className="shadow-sm">
            <thead style={{ backgroundColor: '#8E44AD', color: 'white' }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordinaryList.length > 0 ? (
                ordinaryList.map((agent) => {
                  const open = toggle[agent._id] || false;

                  return (
                    <tr key={agent._id}>
                      <td>{agent.name}</td>
                      <td>{agent.email}</td>
                      <td>{agent.phone}</td>
                      <td>
                        <Button
                          onClick={() => handleToggle(agent._id)}
                          aria-controls={`collapse-${agent._id}`}
                          aria-expanded={open}
                          size="sm"
                          variant="outline-primary"
                          className="me-2"
                          style={{ borderColor: '#6A0DAD', color: '#6A0DAD' }}
                        >
                          Update
                        </Button>

                        <Collapse in={open}>
                          <div id={`collapse-${agent._id}`} className="my-3">
                            <Form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(agent._id);
                              }}
                            >
                              <Form.Group className="mb-2 ">
                                <Form.Label style={{ color: '#6A0DAD' }}>
                                  Full Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={updateAgent.name}
                                  onChange={handleChange}
                                  placeholder="Enter name"
                                />
                              </Form.Group>

                              <Form.Group className="mb-2">
                                <Form.Label style={{ color: '#6A0DAD' }}>
                                  Email
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  value={updateAgent.email}
                                  onChange={handleChange}
                                  placeholder="Enter email"
                                />
                              </Form.Group>

                              <Form.Group className="mb-2">
                                <Form.Label style={{ color: '#6A0DAD' }}>
                                  Phone
                                </Form.Label>
                                <Form.Control
                                  type="tel"
                                  name="phone"
                                  value={updateAgent.phone}
                                  onChange={handleChange}
                                  placeholder="Enter phone"
                                />
                              </Form.Group>

                              <Button
                                size="sm"
                                variant="success"
                                type="submit"
                                className="mt-2"
                              >
                                Submit
                              </Button>
                            </Form>
                          </div>
                        </Collapse>

                        <Button
                          onClick={() => deleteUser(agent._id)}
                          size="sm"
                          variant="outline-danger"
                          className="mt-2"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">
                    <Alert variant="info" className="text-center">
                      <Alert.Heading>No Agents to show</Alert.Heading>
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default AgentInfo;
