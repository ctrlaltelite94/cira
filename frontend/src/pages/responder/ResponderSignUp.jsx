import React, { useState } from 'react';

const ResponderSignUp = () => {
    const [formData, setFormData] = useState({
        stationName: '',
        stationCode: '',
        password: '',
        type: 'Police',
        contactNumber: '',
        location: {
            coordinates: [],
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [locationStatus, setLocationStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePassword = () => setShowPassword((prev) => !prev);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setLocationStatus('Geolocation is not supported by your browser.');
            return;
        }

        setLocationStatus('Locating...');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = [position.coords.longitude, position.coords.latitude];
                setFormData((prev) => ({
                    ...prev,
                    location: {
                        ...prev.location,
                        coordinates: coords,
                    },
                }));
                setLocationStatus(`Location set to: ${coords[1]}, ${coords[0]}`);
            },
            (error) => {
                let message = '';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Permission denied for geolocation.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Location position unavailable.';
                        break;
                    case error.TIMEOUT:
                        message = 'Location request timed out.';
                        break;
                    default:
                        message = 'An unknown error occurred.';
                }
                setLocationStatus(message);
                console.error('Geolocation error:', error);
            },
            {
                enableHighAccuracy: true, // more accurate but may take longer
                timeout: 10000, // 10 seconds
                maximumAge: 0
            }
        );
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // You can POST the formData to your backend here
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow mt-5">
                        <h4 className="text-center mb-4">Responder Sign Up</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="stationName" className="form-label">Station Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="stationName"
                                    name="stationName"
                                    value={formData.stationName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Type</label>
                                <select
                                    className="form-select"
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Police">Police</option>
                                    <option value="Ambulance">Ambulance</option>
                                </select>
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

                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="mb-3">
                                <label>Location Coordinates</label>
                                <div className="d-flex align-items-center gap-2">
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={getLocation}>
                                        Get Location
                                    </button>
                                    <small className="text-muted">{locationStatus}</small>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponderSignUp;
