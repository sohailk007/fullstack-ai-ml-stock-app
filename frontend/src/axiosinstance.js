import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/api/v1/";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
   ========================= */
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
   ========================= */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${baseURL}token/refresh/`,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccessToken = response.data.access;
        localStorage.setItem("access", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        logoutUser();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

/* =========================
   LOGOUT HANDLER
   ========================= */
function logoutUser() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
}

export default axiosInstance;
