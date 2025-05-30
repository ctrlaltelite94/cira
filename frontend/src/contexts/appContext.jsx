import React, { useContext, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import * as apiClient from '../apiClient.js'


const appContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
    const [toast, setToast] = useState(undefined);

    const { isError } = useQuery({
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
