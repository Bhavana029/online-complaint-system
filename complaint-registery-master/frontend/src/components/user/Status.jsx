import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({})

  const [statusCompliants, setStatusCompliants] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const { _id } = user;
    axios.get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusCompliants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
       ...prevState,
       [complaintId]: !prevState[complaintId],
    }));
 };

 return (
  <>
    <div className="container mt-4">
      <div className="row">
        {statusCompliants.length > 0 ? (
          statusCompliants.map((complaint, index) => {
            const open = toggle[complaint._id] || false;
            return (
              <div className="col-lg-6 col-md-6 col-12 mb-4" key={index}>
  <Card className="h-100 shadow-sm" style={{ minWidth: '100%', padding: '12px' }}>
                  <Card.Body>
                    <Card.Title>Name: {complaint.name}</Card.Title>
                    <Card.Text>Address: {complaint.address}</Card.Text>
                    <Card.Text>City: {complaint.city}</Card.Text>
                    <Card.Text>State: {complaint.state}</Card.Text>
                    <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                    <Card.Text>Comment: {complaint.comment}</Card.Text>
                    <Card.Text>Status: {complaint.status}</Card.Text>
                    <Button className='mb-2 float-end' onClick={() => handleToggle(complaint._id)}
                      aria-controls={`collapse-${complaint._id}`}
                      aria-expanded={open} variant="primary">
                      Message
                    </Button>
                    <Collapse in={open}>
                      <div id={`collapse-${complaint._id}`}>
                        <Card body style={{ width: '100%', marginTop: '12px' }}>
                          <ChatWindow key={complaint._id} complaintId={complaint._id} name={complaint.name} />
                        </Card>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              </div>
            )
          })
        ) : (
          <Alert variant="info">
            <Alert.Heading>No complaints to show</Alert.Heading>
          </Alert>
        )}
      </div>
    </div>
  </>
)

}

export default Status;










