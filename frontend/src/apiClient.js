
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const validateToken = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/admin_auth/validate-token`,
      { credentials: "include" }
    );
  
    if (!response.ok) {
      throw new Error("Invalid Token");
    }
    return response.json();
  };