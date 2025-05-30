import { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgClass = type === "SUCCESS" ? "bg-success" : "bg-danger";

    return (
        <div
            className={`toast show position-fixed top-0 end-0 m-4 text-white ${bgClass}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ zIndex: 1055 }}
        >
            <div className="d-flex">
                <div className="toast-body fw-semibold">{message}</div>
                <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
};

export default Toast;
