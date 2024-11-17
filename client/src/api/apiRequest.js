export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const api = import.meta.env.VITE_API_URL;

  const response = await fetch(`${api}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};
