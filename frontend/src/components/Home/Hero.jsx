import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div
            className="flex items-center justify-center text-white h-screen bg-cover bg-center pt-16"
            style={{
                backgroundImage:
                    "url('https://roadsave.co.za/wp-content/uploads/2022/09/9-11.png')",
            }}
        >
            <div className="text-center bg-transparent p-8 rounded-lg  max-w-md mx-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency</h1>
                <p className="text-lg md:text-xl mb-6">Worry not, report it now.</p>
                <Link
                    to="/create"
                    className="inline-block border border-white text-white hover:bg-white hover:text-black transition px-6 py-3 rounded-lg text-lg font-medium"
                >
                    Create
                </Link>
            </div>
        </div>
    );
};

export default Hero;
