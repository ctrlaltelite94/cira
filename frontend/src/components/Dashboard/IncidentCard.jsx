import React from "react";
import { Link } from "react-router-dom";

const IncidentCard = ({ incident }) => {
    const getStatusBadge = (status) => {
        switch (status) {
            case "Resolved":
                return "bg-green-100 text-green-800";
            case "Responding":
                return "bg-yellow-100 text-yellow-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h5 className="text-lg font-semibold text-gray-900">{incident.title}</h5>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadge(incident.status)}`}>
                    {incident.status}
                </span>
            </div>

            <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Type:</span> {incident.incidentType}
            </p>
            <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Address:</span> {incident.address || "N/A"}
            </p>
            <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Ref #:</span> {incident.refNum || "N/A"}
            </p>
            <p className="text-sm text-gray-700 mb-3">
                <span className="font-medium">ETR:</span> {incident.etr ? `${incident.etr} mins` : "Not set"}
            </p>

            <div className="flex gap-2">
                <Link
                    to={`/responder/dashboard/incident/${incident._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md"
                >
                    View
                </Link>
                <Link
                    to={`/responder/dashboard/incident/update/${incident._id}`}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-md"
                >
                    Update
                </Link>
            </div>
        </div>
    );
};

export default IncidentCard;
