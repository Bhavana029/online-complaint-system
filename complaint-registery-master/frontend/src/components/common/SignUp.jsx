import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';

const SignUp = () => {
   const [title, setTitle] = useState("Select User");
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      userType: ""
   });

   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

   const handleTitle = (select) => {
      setTitle(select);
      setUser({ ...user, userType: select });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedUser = { ...user, userType: title };
      try {
         const res = await axios.post("http://localhost:8000/SignUp", updatedUser);
         alert("Record submitted");
         setUser({ name: "", email: "", password: "", phone: "", userType: "" });
         setTitle("Select User");
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <>
         {/* Navbar */}
         <Navbar  style={{ backgroundColor: '#8960a3' }} variant="dark" className="sticky-top shadow">
            <Container>
               <Navbar.Brand className="fw-bold">ComplaintCare</Navbar.Brand>
               <ul className="navbar-nav flex-row gap-4">
                  <li className="nav-item">
                     <Link to="/" className="nav-link text-white fw-semibold">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/signup" className="nav-link text-white fw-semibold">SignUp</Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/login" className="nav-link text-white fw-semibold">Login</Link>
                  </li>
               </ul>
            </Container>
         </Navbar>

         {/* SignUp Form */}
         <section className="min-vh-100 bg-gradient  bg-opacity-25 d-flex align-items-center">
            <Container>
               <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6 col-xl-5">
                     <div className="card border-0 shadow-lg">
                        <div className="card-body p-4">
                           <h3 className="text-center  mb-4" style={{ color: '#6A0DAD' }}>Sign Up to Register</h3>
                           <form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                 <label htmlFor="name" className="form-label fw-medium">Full Name</label>
                                 <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" required />
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="email" className="form-label fw-medium">Email</label>
                                 <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="password" className="form-label fw-medium">Password</label>
                                 <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" required />
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="phone" className="form-label fw-medium">Mobile No.</label>
                                 <input type="tel" name="phone" value={user.phone} onChange={handleChange} className="form-control" required />
                              </div>
                              <div className="mb-3">
                                 <label className="form-label fw-medium d-block">User Type</label>
                                 <Dropdown>
                                  <Dropdown.Toggle className="w-100 text-white border-0" style={{ backgroundColor: '#6A0DAD' }}>

                                       {title}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                       <Dropdown.Item onClick={() => handleTitle("Ordinary")}>Ordinary</Dropdown.Item>
                                       <Dropdown.Item onClick={() => handleTitle("Admin")}>Admin</Dropdown.Item>
                                       <Dropdown.Item onClick={() => handleTitle("Agent")}>Agent</Dropdown.Item>
                                    </Dropdown.Menu>
                                 </Dropdown>
                              </div>
                              <div className="d-grid mt-4">
                                 <button type="submit" className="btn  btn-lg text-white"
                                 style={{
                        backgroundColor: '#6A0DAD',
                        border: 'none',
                        transition: '0.3s'
                      }}
                      onMouseOver={e => e.target.style.backgroundColor = '#580a99'}
                      onMouseOut={e => e.target.style.backgroundColor = '#6A0DAD'}
                                 >Register</button>
                              </div>
                           </form>
                           <p className="text-center mt-3">
                              Already have an account? <Link to="/login" className="text-decoration-none  fw-bold" style={{ color: '#6A0DAD' }}>Login</Link>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </Container>
         </section>

         <Footer />
      </>
   );
};

export default SignUp;
