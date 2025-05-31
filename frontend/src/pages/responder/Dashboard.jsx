import React from 'react'
import { useAppContext } from '../../contexts/appContext'
import { useQuery } from '@tanstack/react-query';
import * as apiClient from '../../apiClient';
import IncidentCard from '../../components/Dashboard/IncidentCard';
const Dashboard = () => {

    const { showToast } = useAppContext();
    const { data } = useQuery({
        queryKey: ['getIncidents'],
        queryFn: async () => {
            try {
                return await apiClient.getIncidents();
            } catch (error) {
                showToast({ message: "Couldn't get Incidents", type: "ERROR" });
                throw error;
            }
        }
    })

    return (
        <div className="px-4 py-8 mt-5 mb-5">
            <h1 className="text-3xl font-bold mb-6 py-5"> Latest Incidents</h1>



            {data ? (
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {data.map((incident) => (
                        <div
                            key={incident._id}
                            className="border rounded-xl shadow-sm p-5 bg-white space-y-2 mb-5"
                        >
                            <IncidentCard incident={incident} />
                        </div>
                    ))}
                </div>
            ) : (
                <span>No data</span>
            )}
        </div>
    );
}

export default Dashboard