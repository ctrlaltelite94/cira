import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import * as apiClient from "../../apiClient";
import { useAppContext } from "../../contexts/appContext";

const UpdateIncident = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await apiClient.updateIncident(id, data);
            showToast({ message: "Incident updated successfully", type: "SUCCESS" });
            navigate(`/responder/dashboard/incident/${id}`);
        } catch (err) {
            showToast({ message: "Failed to update incident", type: "ERROR" });
            console.error(err);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Update Incident</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">
                        Status
                        <select
                            className="form-select"
                            {...register("status", { required: "Status is required" })}
                        >
                            <option value="">Select status</option>
                            <option value="Reported">Reported</option>
                            <option value="Responding">Responding</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        {errors.status && (
                            <span className="text-danger">{errors.status.message}</span>
                        )}
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Estimated Time of Response (ETR) in minutes
                        <input
                            type="number"
                            className="form-control"
                            {...register("etr", {
                                required: "ETR is required",
                                min: { value: 1, message: "Must be at least 1 minute" },
                            })}
                        />
                        {errors.etr && <span className="text-danger">{errors.etr.message}</span>}
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default UpdateIncident;
