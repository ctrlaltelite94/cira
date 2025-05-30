import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Sign In</h2>
                <form>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>

                    {/* Password */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                        />
                        <span
                            className="position-absolute top-50 end-0 translate-middle-y me-3"
                            style={{ cursor: 'pointer' }}
                            onClick={togglePasswordVisibility}
                        >
                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </span>
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="remember" />
                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="text-decoration-none small">Forgot password?</a>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-100">Sign In</button>

                    {/* Sign up link */}

                    <p className="mt-3 text-center text-decoration-none ">
                        Don't have an account? {" "}
                        <Link to={'/signup'}><a href="#" className="text-decoration-none">Sign Up</a></Link>

                    </p>

                </form>
            </div>
        </div>
    );
};

export default SignIn;
