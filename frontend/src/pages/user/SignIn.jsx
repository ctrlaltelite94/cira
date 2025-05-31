import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/appContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as apiClient from '../../apiClient'

const SignIn = () => {
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
        mutationFn: apiClient.loginUser,
        onSuccess: async () => {
            showToast({ message: "Sign In Successful", type: "SUCCESS" });
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            navigate(location.state?.from?.pathname || "/user/profile");
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
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Sign In</h2>
                <form onSubmit={onSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                            <input type="email" className="form-control mt-2" id="email" placeholder="Enter your email"
                                {...register("email", { required: "This field is required" })}
                            />
                            {errors.email && (
                                <span className="text-danger">{errors.email.message}</span>
                            )}
                        </label>

                    </div>

                    {/* Password */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">
                            Password
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control mt-2"
                                id="password"
                                placeholder="Enter your password"
                                {...register("password", { required: "This field is required" })}
                            />
                            {errors.password && (
                                <span className="text-danger">{errors.password.message}</span>
                            )}
                        </label>

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
                        <Link className='text-decoration-none' to={'/signup'}>
                            Sign Up
                        </Link>

                    </p>

                </form>
            </div>
        </div>
    );
};

export default SignIn;
