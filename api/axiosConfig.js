import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.1.11:8080'
  //baseURL: 'https://streamingplatform-be.onrender.com'
})

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.error === "expired_token"
    ) {
      console.log(error)
      localStorage.removeItem("token")
      alert("Fare login da reinderizzare vedere logica");
    }
  }
)

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const refreshToken = async () => {
  const token = getAuthToken();
  if (!token) {
    console.warn("No auth token found. Skipping refresh.");
    return null;
  }

  try {
    const res = await api.get("/token/refresh-token");
    if (res.data.status === 200) {
      localStorage.setItem("token", res.data.token);
      console.log("Token refreshed!");
    } else {
      console.warn("Token refresh failed with status", res.data.status);
      localStorage.removeItem("token")
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.removeItem("token")
  }
}

export default api;