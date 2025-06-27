import axios from 'axios';
import React, { useState } from 'react';

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userComplaint, setUserComplaint] = useState({
    userId: user._id,
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint({ ...userComplaint, [name]: value });
  };

  const handleClear = () => {
    setUserComplaint({
      userId: '',
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;
    axios.post(`http://localhost:8000/Complaint/${_id}`, userComplaint)
      .then(res => {
        alert("Your Complaint has been sent!");
        handleClear();
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong!");
      });
  };

  return (
    <div className="container my-4">
      <div className="card shadow-lg border-0" style={{ backgroundColor: '#f8f2ff' }}>
        <div className="card-header text-white" style={{ backgroundColor: '#6f42c1' }}>
          <h4 className="mb-0">Complaint Registration Form</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-4">

            <div className="col-md-6">
              <label htmlFor="name" className="form-label fw-bold">Name</label>
              <input name="name" onChange={handleChange} value={userComplaint.name} type="text" className="form-control" id="name" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="address" className="form-label fw-bold">Address</label>
              <input name="address" onChange={handleChange} value={userComplaint.address} type="text" className="form-control" id="address" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="city" className="form-label fw-bold">City</label>
              <input name="city" onChange={handleChange} value={userComplaint.city} type="text" className="form-control" id="city" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="state" className="form-label fw-bold">State</label>
              <input name="state" onChange={handleChange} value={userComplaint.state} type="text" className="form-control" id="state" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="pincode" className="form-label fw-bold">Pincode</label>
              <input name="pincode" onChange={handleChange} value={userComplaint.pincode} type="text" className="form-control" id="pincode" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="status" className="form-label fw-bold">Status</label>
              <input placeholder='Type "pending"' name="status" onChange={handleChange} value={userComplaint.status} type="text" className="form-control" id="status" required />
            </div>

            <div className="col-12">
              <label htmlFor="comment" className="form-label fw-bold">Description</label>
              <textarea name="comment" onChange={handleChange} value={userComplaint.comment} className="form-control" id="comment" rows="4" required></textarea>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary px-4">
                Register
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
