
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const validateToken = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/auth/validate-token`,
      { credentials: "include" }
    );
  
    if (!response.ok) {
      throw new Error("Invalid Token");
    }
    return response.json();
};

//'/api/user'

export const registerUser = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  });

  const resBody = await response.json();
  if (!response.ok) {
    throw new Error(resBody.message);
  }
}