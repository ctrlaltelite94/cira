import React, { useContext, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import * as apiClient from '../apiClient.js';
import Toast from "../components/Toast.jsx";

const appContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
    const [toast, setToast] = useState(undefined);

    const { data, isError, isLoading } = useQuery({
        queryKey: ["validateToken"],
        queryFn: apiClient.validateToken,
        retry: false,
    });

    const showToast = (toastMessage) => {
        setToast(toastMessage);
    };

    if (isLoading) {
        // 👇 Don't render anything until auth status is confirmed
        return <div>Loading...</div>;
    }

    return (
        <appContext.Provider
            value={{
                showToast,
                isLoggedIn: !isError,
                userType: data?.userType || null,
                userId: data?.id || null,
            }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </appContext.Provider>
    );
};

export const useAppContext = () => {
    const AppContext = useContext(appContext);
    if (!AppContext) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return AppContext;
};
