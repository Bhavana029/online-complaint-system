import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/Login", user)
      .then((res) => {
        alert("Successfully logged in");
        localStorage.setItem("user", JSON.stringify(res.data));
        const isLoggedIn = JSON.parse(localStorage.getItem("user"));
        const { userType } = isLoggedIn;
        switch (userType) {
          case "Admin": navigate("/AdminHome"); break;
          case "Ordinary": navigate("/HomePage"); break;
          case "Agent": navigate("/AgentHome"); break;
          default: navigate("/Login"); break;
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("User doesn’t exist");
        }
        navigate("/Login");
      });
  };

  return (
    <>





      {/* Sticky Navbar */}
      <Navbar
        expand="lg"
        variant="dark"
        style={{ backgroundColor: '#8960a3' }}
        className="sticky-top shadow-sm "
      >
        <Container className="d-flex justify-content-between">
          <Navbar.Brand className="fw-bold fs-4 text-white">
            ComplaintCare
          </Navbar.Brand>
          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white fw-medium">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link text-white fw-medium">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white fw-medium">Login</Link>
            </li>
          </ul>
        </Container>
      </Navbar>

      {/* Login Section */}
      <section className="vh-100" >
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <h3 className="text-center mb-4 fw-bold text-uppercase" style={{ color: '#6A0DAD' }}>Login</h3>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label fw-semibold">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg w-100 text-white fw-bold"
                      style={{
                        backgroundColor: '#6A0DAD',
                        border: 'none',
                        transition: '0.3s'
                      }}
                      onMouseOver={e => e.target.style.backgroundColor = '#580a99'}
                      onMouseOut={e => e.target.style.backgroundColor = '#6A0DAD'}
                    >
                      Login
                    </button>
                  </form>
                  <p className="mt-4 mb-0 text-center text-muted">
                    Don't have an account?{" "}
                    <Link to="/signup" className="fw-bold" style={{ color: '#6A0DAD' }}>
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Login;
