import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from '../../contexts/appContext'
import { useForm } from "react-hook-form";
import * as apiClient from '../../apiClient'


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
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
    mutationFn: apiClient.registerUser,
    onSuccess: async () => {
      showToast({ message: "Sign Up Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate(location.state?.from?.pathname || "/login")
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
    <div className="min-h-screen py-10">
      <div className="flex flex-col lg:flex-row justify-center items-center w-[90%] max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 px-4">
          <img
            src="https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_1:1,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01grp9b6xsdrhgqfpcc1.jpg"
            alt="Sign Up"
            className="rounded-lg w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 px-4">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h4 className="text-xl font-semibold text-center mb-6">
              Create an account with CIRA
            </h4>
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  {...register("name", { required: "This field is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name.message}</span>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  {...register("address", { required: "This field is required" })}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">{errors.address.message}</span>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                  value={
                    formData.location.coordinates.length
                      ? `${formData.location.coordinates[1]}, ${formData.location.coordinates[0]}`
                      : ''
                  }
                  readOnly
                />
                <button
                  type="button"
                  onClick={getLocation}
                  className="mt-2 inline-block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Get My Location
                </button>
                <div className="text-gray-500 text-sm mt-1">{locationStatus}</div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={viewPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                  {...register("confirmPassword", {
                    validate: (val) => {
                      if (!val) return "This field is required";
                      if (watch("password") !== val)
                        return "Your passwords do not match";
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i className={`fas ${viewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Register
              </button>

              {/* Link to login */}
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </p>
                <div className='mt-3'>
                  <p className='text-sm'>Responder? Sign Up {" "}
                    <Link className="text-blue-600 hover:underline" to={'/responder/signup'}>
                      Here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
