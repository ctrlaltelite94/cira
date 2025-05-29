import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, } from "mdb-react-ui-kit";

const SignIn = () => {
    return (
        <div>
            <div id='intro' className='bg-image shadow-2-strong'>
                <div className='mask d-flex align-items-center h-100' style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                    <MDBContainer>
                        <MDBRow className='justify-content-center'>
                            <MDBCol xl="5" md="8">
                                <MDBCard className='p-5'>
                                    <form>
                                        <h2 className='display-4'>Login</h2>
                                        <div className='form-outline mb-4"'>
                                            <MDBInput
                                                label="Email address"
                                                type="email"
                                                id="form1Example1"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className='form-outline mb-4"'>
                                            <MDBInput
                                                label="Password"
                                                type="password"
                                                id="form1Example1"
                                                className="form-control"
                                            />
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col d-flex justify-content-center">

                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                                    <label className="form-check-label" for="form1Example3">Remember me</label>
                                                </div>
                                            </div>

                                            <div className="col text-center">

                                                <a href="#!">Forgot password?</a>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-block" data-mdb-ripple-init>Sign in</button>
                                    </form>

                                </MDBCard>
                            </MDBCol>

                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        </div>
    )
}

export default SignIn