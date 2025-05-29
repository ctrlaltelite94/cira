import React, { useContext, useState } from "react";
import { useQuery } from '@tanstack/react-query';



const AppContext = React.createContext(undefined);

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
        <AppContext.Provider
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
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
