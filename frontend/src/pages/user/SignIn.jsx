import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/appContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as apiClient from '../../apiClient';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
        mutationFn: apiClient.loginUser,
        onSuccess: async () => {
            showToast({ message: 'Sign In Successful', type: 'SUCCESS' });
            await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
            navigate(location.state?.from?.pathname || '/user/profile');
        },
        onError: (error) => {
            showToast({ message: error.message, type: 'ERROR' });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', { required: 'This field is required' })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...register('password', { required: 'This field is required' })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                        )}
                        <span
                            className="absolute top-9 right-3 text-gray-600 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </span>
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2 text-blue-500 focus:ring-0" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>

                    {/* Sign up link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
