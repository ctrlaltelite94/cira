import React from "react";
import { Link } from "react-router-dom";

const IncidentCard = ({ incident }) => {
    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{incident.title}</h5>
                    <span className={`badge 
            ${incident.status === "Resolved" ? "bg-success" :
                            incident.status === "Responding" ? "bg-warning text-dark" :
                                incident.status === "Cancelled" ? "bg-danger" :
                                    "bg-secondary"}`}>
                        {incident.status}
                    </span>
                </div>
                <p className="card-text mb-1"><strong>Type:</strong> {incident.incidentType}</p>
                <p className="card-text mb-1"><strong>Address:</strong> {incident.address || "N/A"}</p>
                <p className="card-text mb-1"><strong>Ref #:</strong> {incident.refNum || "N/A"}</p>
                <p className="card-text mb-3"><strong>ETR:</strong> {incident.etr ? `${incident.etr} mins` : "Not set"}</p>
                <div className="d-flex gap-2">
                    <div className="d-flex gap-2">
                        <Link className="btn btn-primary btn-sm text-light"
                            to={`/responder/dashboard/incident/${incident._id}`}>
                            View
                        </Link>
                        <Link className="btn btn-success btn-sm text-light" to={`/responder/dashboard/incident/update/${incident._id}`}>
                            Update
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidentCard;
