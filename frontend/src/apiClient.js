
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
export const registerResponder = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/responder/register`, {
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

///api/auth/user/login

export const loginUser = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
}
export const loginResponder = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/responder/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
}

export const createIncident = async (formData) => {
  console.log("api client: ", formData)
  const res = await fetch(`${API_BASE_URL}/api/incident/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),  // stringify here
  });
  if (!res.ok) {
    throw new Error("Failed to add incident");
  }
  return res.json();
};

export const fetchMyIncidents = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/myincidents`, {
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Unable to fetch campaigns");
  };

  const result = await response.json()
  console.log(result)
  return result;
}