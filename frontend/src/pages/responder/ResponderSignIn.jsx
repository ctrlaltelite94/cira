import React, { useState } from 'react';

const ResponderSignIn = () => {
    const [formData, setFormData] = useState({
        stationCode: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePassword = () => setShowPassword(prev => !prev);

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginPayload = {
            stationCode: formData.stationCode,
            password: formData.password,
        };

        console.log('Logging in with:', loginPayload);
        // You would POST this to your backend login route here
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow p-4 mt-5">
                        <h4 className="mb-4 text-center">Responder Sign In</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="stationCode" className="form-label">Station Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="stationCode"
                                    name="stationCode"
                                    value={formData.stationCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                                    style={{ cursor: 'pointer' }}
                                    onClick={togglePassword}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponderSignIn;
