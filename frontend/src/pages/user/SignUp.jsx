import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setViewPassword(prev => !prev);

  return (
    <div className="container-fluid my-5 py-5 bg-light min-vh-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-8 col-lg-6 col-xl-5 mb-4">
          <img
            src="https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_1:1,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01grp9b6xsdrhgqfpcc1.jpg"
            className="img-fluid rounded"
            alt="Sign Up"
          />
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow p-4">
            <h4 className="mb-3 text-center">Create an account with CIRA</h4>
            <form>
              {/* First Name */}
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input type="text" className="form-control" id="first_name" />
              </div>

              {/* Last Name */}
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="last_name" />
              </div>

              {/* Address */}
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" />
              </div>

              {/* Location */}
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" className="form-control" id="location" />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>

              {/* Password */}
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: 'pointer' }}
                  onClick={togglePasswordVisibility}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>

              {/* Confirm Password */}
              <div className="mb-3 position-relative">
                <label htmlFor="password_confirm" className="form-label">Confirm Password</label>
                <input
                  type={viewPassword ? "text" : "password"}
                  className="form-control"
                  id="password_confirm"
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i className={`fas ${viewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>

              {/* Register Button */}
              <button type="submit" className="btn btn-primary w-100">Register</button>

              {/* Login Link */}
              <div className="text-center mt-3">
                <p className="mb-0">Already have an account? {" "}
                  <Link to={'/login'}>
                    <a href="#">Login</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
