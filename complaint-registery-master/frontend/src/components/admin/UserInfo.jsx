import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Footer from '../common/FooterC';
import axios from 'axios';

const UserInfo = () => {
  const navigate = useNavigate();
  const [ordinaryList, setOrdinaryList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [updateUser, setUpdateUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (user_id) => {
    if (!updateUser.name && !updateUser.email && !updateUser.phone) {
      alert('At least one field must be filled');
      return;
    }

    const confirmUpdate = window.confirm('Are you sure you want to update the user?');
    if (confirmUpdate) {
      try {
        await axios.put(`http://localhost:8000/user/${user_id}`, updateUser);
        alert('User updated successfully');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getOrdinaryRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/OrdinaryUsers');
        setOrdinaryList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrdinaryRecords();
  }, [navigate]);

  const deleteUser = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete the user?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
        setOrdinaryList(ordinaryList.filter((user) => user._id !== userId));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggle = (userId) => {
    setToggle((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <>
      {/* Fixed Purple Navbar */}
      <Navbar fixed="top" expand="lg" style={{ backgroundColor: '#6A0DAD' }} variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold">User Info Panel</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/')} className="text-white">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Body Section */}
      <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '80px' }}>
        <Container className="py-4">
          <h3 className="text-center mb-4" style={{ color: '#6A0DAD' }}>User Details</h3>

          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: '#6A0DAD', color: 'white' }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordinaryList.length > 0 ? (
                ordinaryList.map((user) => {
                  const open = toggle[user._id] || false;

                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button
                          onClick={() => handleToggle(user._id)}
                          aria-controls={`collapse-${user._id}`}
                          aria-expanded={open}
                          className="me-2 mb-2"
                          variant="outline-warning"
                          size="sm"
                        >
                          Update
                        </Button>

                        <Collapse in={open}>
                          <div id={`collapse-${user._id}`}>
                            <Form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(user._id);
                              }}
                              className="mb-3"
                            >
                              <Form.Group className="mb-2">
                                <Form.Label style={{ color: '#6A0DAD' }}>Full Name</Form.Label>
                                <Form.Control
                                  name="name"
                                  value={updateUser.name}
                                  onChange={handleChange}
                                  type="text"
                                  placeholder="Enter name"
                                />
                              </Form.Group>

                              <Form.Group className="mb-2">
                                <Form.Label style={{ color: '#6A0DAD' }}>Email address</Form.Label>
                                <Form.Control
                                  name="email"
                                  value={updateUser.email}
                                  onChange={handleChange}
                                  type="email"
                                  placeholder="Enter email"
                                />
                              </Form.Group>

                              <Form.Group className="mb-2">
                                <Form.Label style={{ color: '#6A0DAD' }}>Phone</Form.Label>
                                <Form.Control
                                  name="phone"
                                  value={updateUser.phone}
                                  onChange={handleChange}
                                  type="tel"
                                  placeholder="Enter phone"
                                />
                              </Form.Group>

                              <Button size="sm" variant="outline-success" type="submit">
                                Submit
                              </Button>
                            </Form>
                          </div>
                        </Collapse>

                        <Button
                          onClick={() => deleteUser(user._id)}
                          className="mt-1"
                          variant="outline-danger"
                          size="sm"
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
                    <Alert variant="info" className="text-center mb-0">
                      <Alert.Heading>No Users to Show</Alert.Heading>
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

export default UserInfo;
