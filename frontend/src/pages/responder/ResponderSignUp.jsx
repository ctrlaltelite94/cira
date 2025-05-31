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
        <div className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="bg-white p-6 shadow-lg rounded-lg mt-12">
                        <h4 className="text-xl font-semibold text-center mb-6">Responder Sign Up</h4>

                        <form onSubmit={onSubmit} className="space-y-5">
                            {/* Station Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Station Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                                    {...register("stationName", { required: "This field is required" })}
                                />
                                {errors.stationName && (
                                    <span className="text-sm text-red-500">{errors.stationName.message}</span>
                                )}
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                                    {...register("type", { required: "This field is required" })}
                                >
                                    <option value="">Select</option>
                                    <option value="Police">Police</option>
                                    <option value="Ambulance">Ambulance</option>
                                </select>
                                {errors.type && (
                                    <span className="text-sm text-red-500">{errors.type.message}</span>
                                )}
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-500"
                                    {...register("password", {
                                        required: "This field is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                />
                                <span
                                    className="absolute right-3 top-9 cursor-pointer text-gray-600"
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                                {errors.password && (
                                    <span className="text-sm text-red-500">{errors.password.message}</span>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type={viewPassword ? "text" : "password"}
                                    id="confirm-password"
                                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-500"
                                    {...register("confirmPassword", {
                                        validate: (val) => {
                                            if (!val) return "This field is required";
                                            if (watch("password") !== val) return "Your passwords do not match";
                                        },
                                    })}
                                />
                                <span
                                    className="absolute right-3 top-9 cursor-pointer text-gray-600"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    <i className={`fas ${viewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                                {errors.confirmPassword && (
                                    <span className="text-sm text-red-500">
                                        {errors.confirmPassword.message}
                                    </span>
                                )}
                            </div>

                            {/* Contact */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    id="contact"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                                    {...register("contact", { required: "This field is required" })}
                                />
                                {errors.contact && (
                                    <span className="text-sm text-red-500">{errors.contact.message}</span>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    readOnly
                                    value={
                                        formData.location.coordinates.length
                                            ? `${formData.location.coordinates[1]}, ${formData.location.coordinates[0]}`
                                            : ''
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                                />
                                <button
                                    type="button"
                                    onClick={getLocation}
                                    className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                                >
                                    Get My Location
                                </button>
                                <div className="text-sm text-gray-500 mt-1">{locationStatus}</div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ResponderSignUp;
