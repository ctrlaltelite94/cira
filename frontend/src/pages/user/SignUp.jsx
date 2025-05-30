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
    <div className="container-fluid my-5 py-5 bg-light min-vh-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-8 col-lg-6 col-xl-5 mb-4">
          <img
            src="https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_1:1,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01grp9b6xsdrhgqfpcc1.jpg"
            className="img-fluid rounded"
            alt="Sign Up"
          />
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow p-4">
            <h4 className="mb-3 text-center">Create an account with CIRA</h4>
            <form onSubmit={onSubmit}>
              {/* First Name */}
              <div className="mb-3">
                <label className="form-label">
                  Name
                  <input type="text" className="form-control mt-2" id="name"
                    {...register("name", { required: "This field is required" })}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name.message}</span>
                  )}
                </label>

              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label">Address
                  <input type="text" className="form-control" id="address"
                    {...register("address", { required: "This field is required" })}
                  />
                  {errors.address && (
                    <span className="text-danger">{errors.address.message}</span>
                  )}
                </label>

              </div>

              {/* Location */}
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


              {/* Email */}
              <div className="mb-3">
                <label className="form-label">
                  Email
                  <input type="text" className="form-control" id="address"
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

              {/* Register Button */}
              <button type="submit" className="btn btn-primary w-100">Register</button>

              {/* Login Link */}
              <div className="text-center mt-3">
                <p className="mb-0">Already have an account? {" "}
                  <Link to={'/login'}>
                    <a href="#">Login</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
