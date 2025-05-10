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
    const issuedAt = parseInt(
      localStorage.getItem("token_issued_at") || "0",
      10
    );
    const expiresIn = parseInt(
      localStorage.getItem("token_expires_in") || "0",
      10
    );
    const now = Date.now();
    const isExpired = now > issuedAt + expiresIn * 1000;
    if (!token || isExpired) {
      // Clean up and optionally redirect to login
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_expires_in");
      localStorage.removeItem("token_issued_at");
      throw new axios.Cancel("Token expired or missing");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosTokenInstance;
