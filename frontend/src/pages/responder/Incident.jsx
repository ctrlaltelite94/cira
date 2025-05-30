import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import { useAppContext } from "../../contexts/appContext";

const Incident = () => {
    const { id } = useParams();
    const { showToast } = useAppContext();

    const { data: incident, isLoading, isError, error } = useQuery({
        queryKey: ["incident", id],
        queryFn: async () => {
            try {
                return await apiClient.fetchIncidentById(id); // Create this in apiClient
            } catch (err) {
                showToast({ message: "Unable to load incident details", type: "ERROR" });
                throw err;
            }
        },
    });

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-danger">Error: {error.message}</p>;

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-primary">Incident Details</h2>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title text-dark">{incident.title}</h4>
                    <p className="card-text text-muted">{incident.description}</p>

                    <ul className="list-group list-group-flush mt-3">
                        <li className="list-group-item">
                            <strong>Type:</strong> {incident.incidentType}
                        </li>
                        <li className="list-group-item">
                            <strong>Requested Response:</strong> {incident.requestedResponse}
                        </li>
                        <li className="list-group-item">
                            <strong>Status:</strong> {incident.status}
                        </li>
                        {incident.address && (
                            <li className="list-group-item">
                                <strong>Address:</strong> {incident.address}
                            </li>
                        )}
                        {incident.location?.coordinates?.length === 2 && (
                            <li className="list-group-item">
                                <strong>Coordinates:</strong>{" "}
                                {incident.location.coordinates[1].toFixed(5)}, {incident.location.coordinates[0].toFixed(5)}
                            </li>
                        )}
                        {incident.etr !== null && incident.etr !== undefined && (
                            <li className="list-group-item">
                                <strong>ETR:</strong> {incident.etr} minutes
                            </li>
                        )}
                        {incident.refNum && (
                            <li className="list-group-item">
                                <strong>Reference Number:</strong> {incident.refNum}
                            </li>
                        )}
                    </ul>

                    <div className="mt-4 text-secondary">
                        <small>
                            Reported on: {new Date(incident.createdAt).toLocaleString()}
                            <br />
                            Last updated: {new Date(incident.updatedAt).toLocaleString()}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Incident;
