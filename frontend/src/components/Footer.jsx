import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
            <div className="container text-center text-md-start">
                {/* Top Row */}
                <div className="row mb-4 align-items-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <h5 className="fw-bold">Get connected with us on social networks:</h5>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* Middle Row - Links */}
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h6 className="text-uppercase fw-bold">CIRA</h6>
                        <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#ffffff', height: '2px' }} />
                        <p className="mt-3">Citizen Incident Response Agent</p>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h6 className="text-uppercase fw-bold">Quick Links</h6>
                        <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#ffffff', height: '2px' }} />
                        <ul className="list-unstyled mt-3">
                            <li><a href="#!" className="text-white text-decoration-none">About Us</a></li>
                            <li><a href="#!" className="text-white text-decoration-none">Contact Us</a></li>
                            <li><a href="#!" className="text-white text-decoration-none">Sign Up</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h6 className="text-uppercase fw-bold">Contact</h6>
                        <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#ffffff', height: '2px' }} />
                        <p className="mt-3"><i className="fas fa-home me-2"></i> Johannesburg, South Africa</p>
                        <p><i className="fas fa-envelope me-2"></i> info@cira.com</p>
                        <p><i className="fas fa-phone me-2"></i> 011 343 2390</p>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="text-center pt-3 border-top border-light">
                    <p className="mb-0">
                        © 2025 Copyright: <a href="#!" className="text-white fw-bold text-decoration-none">CIRA</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
