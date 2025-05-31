import React, { useState } from 'react';
import { useAppContext } from '../../contexts/appContext';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../../apiClient'
import { useForm } from 'react-hook-form'
const Create = () => {
    const [locationStatus, setLocationStatus] = useState('');
    const [formData, setFormData] = useState({
        location: {
            type: "Point",
            coordinates: [],
        },
    });
    const [copied, setCopied] = useState(false);
    const [refNum, setRefNum] = useState(null);
    const [message, setMessage] = useState('')

    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const mutation = useMutation({
        mutationFn: apiClient.createIncident,
        onSuccess: async (data) => {
            setRefNum(data.refNum);
            setMessage(data.message)
            showToast({ message: "Created Incident", type: "SUCCESS" });
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });

        },
        onError: (error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    })

    const onSubmit = handleSubmit((data) => {
        // merge formData.location into data
        const fullData = {
            ...data,
            location: formData.location
        };
        //console.log(fullData);
        mutation.mutate(fullData);
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


    const handleCopy = () => {
        navigator.clipboard.writeText(refNum).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 2s
        });
    };


    return (
        <div className="mt-5">
            {refNum ? (
                <div className='py-5 h-screen'>
                    <div className="alert alert-success text-center py-5">
                        <h4 className="mb-2 text-success">{message} successfully</h4>

                        <div className="flex flex-col items-center">
                            <p className="py-2">
                                <strong>Reference Number:</strong> {refNum}
                            </p>

                            <button
                                onClick={handleCopy}
                                className="btn text-white bg-primary"
                            >
                                {copied ? "Copied!" : "Copy Ref Number"}
                            </button>
                        </div>

                        <div className="mt-4">
                            <Link to="/user/profile" className="text-decoration-none">
                                Go to profile
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className='pt-5'>Create New Incident</h2>
                    <hr />
                    <form onSubmit={onSubmit} className='py-4'>

                        <div className="mb-3">
                            <label className="form-label">
                                Title
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    {...register("Title", { required: "This field is required" })}
                                />
                                {errors.title && (
                                    <span className="text-red-700">{errors.title.message}</span>
                                )}
                            </label>

                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Description
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    {...register("description", { required: "This field is required" })}
                                />
                                {errors.description && (
                                    <span className="text-red-700">{errors.description.message}</span>
                                )}
                            </label>

                        </div>

                        <div className="mb-3">
                            <p className="form-label font-semibold mb-2">Incident Type</p>
                            {IncidentTypes.map((type, index) => (
                                <label
                                    key={type}
                                    htmlFor={`incident-type-${index}`}
                                    className="inline-flex items-center mr-4 cursor-pointer"
                                >
                                    <input
                                        id={`incident-type-${index}`}
                                        type="radio"
                                        value={type}
                                        className="form-radio text-blue-600 mx-4"
                                        {...register("incidentType", {
                                            required: "This field is required",
                                        })}
                                    />
                                    <span className="ml-2">{type}</span>
                                    {errors.incidentType && (
                                        <span className="text-red-700">{errors.incidentType.message}</span>
                                    )}
                                </label>
                            ))}
                            {errors.incideType && (
                                <span className="text-red-600 text-sm font-bold block mt-1">
                                    {errors.incideType.message}
                                </span>
                            )}
                        </div>


                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address <span className="text-muted">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                {...register("address")}
                            />

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



                        <div className="mb-3">
                            <label className="form-label">
                                Requested Response
                                <select
                                    className="form-select"
                                    {...register("requestedResponse", { required: "This field is required" })}
                                >
                                    <option value="">Select</option>
                                    <option value="Police">Police</option>
                                    <option value="Ambulance">Ambulance</option>
                                    <option value="Both">Both</option>
                                </select>
                                {errors.requestedResponse && (
                                    <span className="text-red-700">{errors.requestedResponse.message}</span>
                                )}
                            </label>
                        </div>


                        <button type="submit" className="btn btn-primary mb-5">Create Incident</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Create;

const IncidentTypes =
    [
        "Traffic Accident",
        "Fire",
        "Medical Emergency",
        "Assault",
        "Theft",
        "Natural Disaster",
        "Hazardous Material",
        "Other"
    ];

