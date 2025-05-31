import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        // Hero Section
        <div
            className="d-flex align-items-center justify-content-center text-white"
            style={{
                backgroundImage:
                    "url('https://roadsave.co.za/wp-content/uploads/2022/09/9-11.png')",
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingTop: '60px',
            }}
        >
            <div className="text-center bg-dark bg-opacity-50 p-5 rounded">
                <h1 className="display-4 fw-bold">Emergency</h1>
                <p className="lead mb-4">Worry not, report it now.</p>
                <Link className="btn btn-outline-light btn-lg">
                    Create
                </Link>
            </div>
        </div>
    );
};

export default Hero;
