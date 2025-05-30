
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    method: "GET",
    credentials: "include", // 👈 crucial!
  });

  if (!res.ok) {
    throw new Error("Token not valid");
  }

  return res.json();
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

export const logout = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Error during sign out");
  }
};

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

export const getIncidents = async () => {
  const res = await fetch(`${API_BASE_URL}/api/responder/getincidents`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Unable to fetch incidents");
  }

  const result = await res.json();
  return result.incidents; 
};

///incident/: id

export const fetchIncidentById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/responder/incident/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch incident");
  }

  const res = await response.json();
  return res.incident
};

export const updateIncident = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/api/responder/incident/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update incident");
  }

  return await response.json();
};

