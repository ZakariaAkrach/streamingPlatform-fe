import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080'
  //baseURL: 'https://streamingplatform-be.onrender.com'
})

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const refreshToken = async () => {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    api.get("/token/refresh-token")
      .then(res => {
        if (res.data.status === 200) {
          localStorage.setItem("token", res.data.token)
        }
      })

  } catch (error) {
    console.error("Failed to refresh token: ", error)
  }
}

export default api;