import React from 'react';

const Footer = () => {
    return (
        <div className="w-full py-10 bg-gray-900 text-white">
            <div className="w-[70%] mx-auto px-4">
                {/* Top Row */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h5 className="text-lg font-semibold mb-4 md:mb-0">
                        Get connected with us on social networks:
                    </h5>
                    <div className="flex space-x-6">
                        <a href="#!" className="text-white hover:text-blue-400 text-xl">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white hover:text-blue-400 text-xl">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white hover:text-pink-400 text-xl">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* Middle Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Column 1 */}
                    <div>
                        <h6 className="uppercase font-bold">CIRA</h6>
                        <div className="w-16 h-0.5 bg-white my-2 mx-auto md:mx-0"></div>
                        <p className="mt-3">Citizen Incident Response Agent</p>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h6 className="uppercase font-bold">Quick Links</h6>
                        <div className="w-16 h-0.5 bg-white my-2 mx-auto md:mx-0"></div>
                        <ul className="mt-3 space-y-2">
                            <li><a href="#!" className="hover:underline">About Us</a></li>
                            <li><a href="#!" className="hover:underline">Contact Us</a></li>
                            <li><a href="#!" className="hover:underline">Sign Up</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h6 className="uppercase font-bold">Contact</h6>
                        <div className="w-16 h-0.5 bg-white my-2 mx-auto md:mx-0"></div>
                        <p className="mt-3"><i className="fas fa-home mr-2"></i> Johannesburg, South Africa</p>
                        <p><i className="fas fa-envelope mr-2"></i> info@cira.com</p>
                        <p><i className="fas fa-phone mr-2"></i> 011 343 2390</p>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="border-t border-white mt-8 pt-4 text-center">
                    <p className="mb-0">
                        © 2025 Copyright: <a href="#!" className="font-bold hover:underline">CIRA</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
