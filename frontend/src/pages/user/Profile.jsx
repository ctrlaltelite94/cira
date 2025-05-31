import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/appContext";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import IncidentCard from "../../components/User/IncidentCard";

const Profile = () => {
    const { showToast, user } = useAppContext();
    const userInfo = user;
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
        <div className="py-8 mt-5 mb-5">
            <h1 className="text-3xl font-bold  py-5">Hi {userInfo.name}!</h1>

            <Link to={"/user/create"}>
                <button className="bg-blue-600 py-2 px-4 rounded-md text-white">Create</button>
            </Link>

            <div className="flex">
                {data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {data.map((incident) => (
                            <IncidentCard incident={incident} />
                        ))}
                    </div>
                ) : (
                    <div className="flex w-full py-20 justify-center items-center">
                        <p className="text-2xl">No Data</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
