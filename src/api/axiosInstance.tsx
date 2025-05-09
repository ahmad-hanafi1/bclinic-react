import axios from "axios";

// This is to protect API calls from being made without a token
// and to attach the token to the request headers
const axiosTokenInstance = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Attach token before each request
axiosTokenInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosTokenInstance;
