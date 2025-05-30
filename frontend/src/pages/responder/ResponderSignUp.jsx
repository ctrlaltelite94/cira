import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/appContext';
import { useForm } from 'react-hook-form'
import * as apiClient from '../../apiClient';

const ResponderSignUp = () => {
    const [locationStatus, setLocationStatus] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const [formData, setFormData] = useState({
        location: {
            type: "Point",
            coordinates: [],
        },
    });

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setViewPassword(prev => !prev);

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const { register, watch, handleSubmit, formState: { errors }, } = useForm();

    const mutation = useMutation({
        mutationFn: apiClient.registerResponder,
        onSuccess: async () => {
            showToast({ message: "Sign Up Successful", type: "SUCCESS" });
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            navigate(location.state?.from?.pathname || "/responder/login")
        }
    });

    const onSubmit = handleSubmit((data) => {
        const submissionData = {
            ...data,
            location: formData.location,
        };

        console.log(submissionData);
        mutation.mutate(submissionData);
    });


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

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow mt-5">
                        <h4 className="text-center mb-4">Responder Sign Up</h4>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">
                                    Station Name
                                    <input type="text" className="form-control mt-2" id="name"
                                        {...register("stationName", { required: "This field is required" })}
                                    />
                                    {errors.stationName && (
                                        <span className="text-danger">{errors.stationName.message}</span>
                                    )}
                                </label>

                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Type
                                    <select
                                        className="form-select"
                                        {...register("type", { required: "This field is required" })}
                                    >
                                        <option value="">Select</option>
                                        <option value="Police">Police</option>
                                        <option value="Ambulance">Ambulance</option>
                                    </select>
                                    {errors.type && (
                                        <span className="text-danger">{errors.type.message}</span>
                                    )}
                                </label>
                            </div>

                            {/* Password */}
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">
                                    Password
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="password"
                                        {...register("password", {
                                            required: "This field is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <span className="text-danger">{errors.password.message}</span>
                                    )}
                                    <span
                                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                                        style={{ cursor: 'pointer' }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </span>
                                </label>
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-3 position-relative">
                                <label className="form-label">
                                    Confirm Password

                                    <input
                                        type={viewPassword ? "text" : "password"}
                                        className="form-control"
                                        id="confirm password"
                                        {...register("confirmPassword", {
                                            validate: (val) => {
                                                if (!val) {
                                                    return "This field is required";
                                                } else if (watch("password") !== val) {
                                                    return "Your passwords do not match ";
                                                }
                                            },
                                        })}
                                    />
                                    {errors.confirmPassword && (
                                        <span className="text-danger">
                                            {errors.confirmPassword.message}
                                        </span>
                                    )}
                                    <span
                                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                                        style={{ cursor: 'pointer' }}
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        <i className={`fas ${viewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </span>
                                </label>

                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Contact Number
                                    <input type="text" className="form-control mt-2" id="contact"
                                        {...register("contact", { required: "This field is required" })}
                                    />
                                    {errors.conatct && (
                                        <span className="text-danger">{errors.conatct.message}</span>
                                    )}
                                </label>

                            </div>


                            <div className="mb-3">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    value={
                                        formData.location.coordinates.length
                                            ? `${formData.location.coordinates[1]}, ${formData.location.coordinates[0]}`
                                            : ''
                                    }
                                    readOnly
                                />
                                <button type="button" onClick={getLocation} className="btn btn-secondary mt-2">
                                    Get My Location
                                </button>
                                <div className="form-text text-muted">{locationStatus}</div>
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
