import React, { useContext, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import * as apiClient from '../apiClient.js'
import Toast from "../components/Toast.jsx";


const appContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
    const [toast, setToast] = useState(undefined);

    const { data, isError } = useQuery({
        queryKey: ["validateToken"],
        queryFn: apiClient.validateToken,
        retry: false,
    });

    const showToast = (toastMessage) => {
        setToast(toastMessage);
    };

    return (
        <appContext.Provider
            value={{
                showToast,
                isLoggedIn: !isError,
                userType: data?.userType || null,
                userId: data?.id || null, // Optional: add ID if needed
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
