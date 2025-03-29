import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Cấu hình interceptor xử lý response
customAxios.interceptors.response.use(
  (response) => {
    // Nếu response hợp lệ, trả về luôn
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Nếu lỗi 401 và request chưa được retry trước đó
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Gửi request đến endpoint refresh-token để lấy access token mới
        const refreshResponse = await axios.post(
          `${BASE_URL}auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.token;
        // Cập nhật header Authorization của request ban đầu
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // Retry lại request ban đầu với token mới
        return customAxios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
