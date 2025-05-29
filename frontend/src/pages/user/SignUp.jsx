import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBIcon } from "mdb-react-ui-kit";

const SignUp = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword, viewPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Toggle password visibility
  const togglePassword = () => {
    viewPassword((prevState) => !prevState);
  };


  return (
    <div>
      <section>
        <div className='container-fluid h-custom'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img src="https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_1:1,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01grp9b6xsdrhgqfpcc1.jpg"
                class="img-fluid" alt="SOS image"></img>
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1' id='register-form'>
              <MDBContainer>
                <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start'>
                  <form action="">
                    <p className='lead fw-normal mb-0 me-3'>Create an account with CIRA </p>

                    <div className='form-outline mb-4"'>
                      <MDBInput
                        label="First Name"
                        type="text"
                        id="first_name"
                        className="form-control"
                      />
                    </div>

                    <div className='form-outline mb-4"'>
                      <MDBInput
                        label="Last Name"
                        type="text"
                        id="last_name"
                        className="form-control"
                      />
                    </div>

                    <div className='form-outline mb-4"'>
                      <MDBInput
                        label="Address"
                        type="text"
                        id="address"
                        className="form-control"
                      />
                    </div>

                    <div className='form-outline mb-4"'>
                      <MDBInput
                        label="Location"
                        type="email"
                        id="location"
                        className="form-control"
                      />
                    </div>

                    <div className='form-outline mb-4"'>
                      <MDBInput
                        label="Email"
                        type="email"
                        id="email"
                        className="form-control"
                      />
                    </div>
                    <div className='form-outline mb-4"'>
                      <MDBInput
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control"
                      />
                      <MDBIcon
                        className="position-absolute top-50 translate-middle-y"
                        icon={showPassword ? "eye-slash" : "eye"}
                        style={{
                          right: "10px",
                          cursor: "pointer",
                        }}
                        onClick={togglePasswordVisibility}>

                      </MDBIcon>

                    </div>

                    <div className='form-outline mb-4"'>
                      <MDBInput
                        label="Confirm Password"
                        type={viewPassword ? "text" : "password"}
                        id="password_confirm"
                        className="form-control"
                      />
                      <MDBIcon
                        className="position-absolute top-50 translate-middle-y"
                        icon={viewPassword ? "eye-slash" : "eye"}
                        style={{
                          right: "10px",
                          cursor: "pointer",
                        }}
                        onClick={togglePassword}>

                      </MDBIcon>

                    </div>

                    <button type="submit" class="btn btn-primary btn-block" data-mdb-ripple-init>Register</button>
                    <div class="row mb-2" style={{marginTop: "1rem"}}>
                      <div className="col text-start">
                        <p>Already have an account? </p>
                      </div>

                      <div className="col text-center">
                        <a href="#!">Login</a>
                      </div>
                    </div>
                  </form>
                </div>
              </MDBContainer>
            </div>

          </div>

        </div>

      </section>
    </div>
  )
}

export default SignUp