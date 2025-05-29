import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className='container my-5 text-center'>
                <footer className="text-center text-lg-start bg-dark text-white">
                    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                        <div className="me-5 d-none d-lg-block">
                            <span>Get connected with us on social networks:</span>
                        </div>
                        <div>
                            <a href="#!" className="me-4 text-reset">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#!" className="me-4 text-reset">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#!" className="me-4 text-reset">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </section>
                    <section className="">
                        <div className="container text-center text-md-start mt-5">
                            <div className="row mt-3">
                                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">CIRA</h6>
                                    <p>
                                        Citizen Incident Response Agent
                                    </p>
                                </div>
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">Quick Links</h6>
                                    <p>
                                        <a href="#!" className="text-reset">About Us</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">Contact us</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">Sign Up</a>
                                    </p>
                                </div>
                                
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                    <p>
                                        <i className="fas fa-home me-3"></i> Johannesburg, South Africa
                                    </p>
                                    <p>
                                        <i className="fas fa-envelope me-3"></i>
                                        info@cira.com
                                    </p>
                                    <p>
                                        <i className="fas fa-phone me-3"></i> 011 343 2390
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div
                        className="text-center p-4"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                    >
                        © 2025 Copyright:  <a className="text-reset fw-bold" href="#!">CIRA</a>
                    </div>
                </footer>

            </div>
        </div>
    )
}

export default Footer
