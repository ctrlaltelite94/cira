import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/appContext";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";

const Profile = () => {
    const { showToast } = useAppContext();

    const { data } = useQuery({
        queryKey: ["fetchMyIncidents"],
        queryFn: async () => {
            try {
                return await apiClient.fetchMyIncidents();
            } catch (error) {
                showToast({ message: "Couldn't get Incidents", type: "ERROR" });
                throw error;
            }
        },
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 mt-5 mb-5">
            <h1 className="text-3xl font-bold mb-6 py-5">My Incidents</h1>

            <Link to={"/user/create"}>
                <button className="btn btn-primary my-3">Create</button>
            </Link>

            {data ? (
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {data.map((incident) => (
                        <div
                            key={incident._id}
                            className="border rounded-xl shadow-sm p-5 bg-white space-y-2 mb-5"
                        >
                            <h2 className="text-xl font-semibold text-blue-800">{incident.title}</h2>
                            <p className="text-gray-600 line-clamp-2">{incident.description}</p>

                            <div className="text-sm text-gray-800 space-y-1">
                                <p>
                                    <span className="font-medium">Type:</span> {incident.incidentType}
                                </p>
                                <p>
                                    <span className="font-medium">Requested Response:</span>{" "}
                                    {incident.requestedResponse}
                                </p>
                                <p>
                                    <span className="font-medium">Status:</span> {incident.status}
                                </p>
                                <p>
                                    <span className="font-medium">Reference Number:</span> {incident.refNum}
                                </p>
                                {incident.address ? (
                                    <p>
                                        <span className="font-medium">Address:</span> {incident.address}
                                    </p>
                                ) : incident.location?.coordinates?.length === 2 ? (
                                    <p>
                                        <span className="font-medium">Coordinates:</span>{" "}
                                        {incident.location.coordinates[1].toFixed(4)},{" "}
                                        {incident.location.coordinates[0].toFixed(4)}
                                    </p>
                                ) : null}
                                {incident.etr !== null && incident.etr !== undefined && (
                                    <p>
                                        <span className="font-medium">ETR:</span> {incident.etr} min
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <span>No data</span>
            )}
        </div>
    );
};

export default Profile;
