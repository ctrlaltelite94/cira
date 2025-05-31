import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/appContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as apiClient from '../../apiClient'
import { Link } from 'react-router-dom';

const ResponderSignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const location = useLocation();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const mutation = useMutation({
        mutationFn: apiClient.loginResponder,
        onSuccess: async () => {
            showToast({ message: "Sign In Successful", type: "SUCCESS" });
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            navigate(location.state?.from?.pathname || "/responder/dashboard");
        },
        onError: (error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        mutation.mutate(data);
    });

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Responder Sign In</h2>

                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Station Code */}
                    <div>
                        <label htmlFor="stationCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Station Code
                        </label>
                        <input
                            type="text"
                            id="stationCode"
                            placeholder="Enter your station code"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("stationCode", { required: "This field is required" })}
                        />
                        {errors.stationCode && (
                            <p className="text-sm text-red-500 mt-1">{errors.stationCode.message}</p>
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
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("password", { required: "This field is required" })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                        <span
                            className="absolute top-9 right-4 text-gray-500 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </span>
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>

                    {/* Sign Up */}
                    <p className="text-center text-sm mt-4">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResponderSignIn;
