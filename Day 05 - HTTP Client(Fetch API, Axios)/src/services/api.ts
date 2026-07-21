import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type {
  ApiResponse, AuthResult, ImageResult, LoginRequest, RegisterRequest,
  Todo, TodoRequest, UpdateProfileRequest, UserResponse,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081";

export const api = axios.create({ baseURL: API_BASE_URL });

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<AuthResult> | null = null;

function clearSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const request = error.config as RetryableRequest | undefined;
    const refreshToken = localStorage.getItem("refreshToken");
    const isAuthRequest = request?.url?.startsWith("/api/auth/");

    if (error.response?.status !== 401 || !request || request._retry || !refreshToken || isAuthRequest) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      refreshPromise ??= axios
        .post<ApiResponse<AuthResult>>(`${API_BASE_URL}/api/auth/refresh`, { refreshToken })
        .then(response => response.data.result)
        .finally(() => { refreshPromise = null; });

      const auth = await refreshPromise;
      localStorage.setItem("accessToken", auth.accessToken);
      localStorage.setItem("refreshToken", auth.refreshToken);
      request.headers.Authorization = `Bearer ${auth.accessToken}`;
      return api(request);
    } catch (refreshError) {
      clearSession();
      if (window.location.pathname !== "/login") window.location.assign("/login");
      return Promise.reject(refreshError);
    }
  },
);

export const authApi = {
  login: (data: LoginRequest) => api.post<ApiResponse<AuthResult>>("/api/auth/login", data),
  register: (data: RegisterRequest) => api.post<ApiResponse<UserResponse>>("/api/auth/register", data),
  refresh: (refreshToken: string) => api.post<ApiResponse<AuthResult>>("/api/auth/refresh", { refreshToken }),
  logout: (refreshToken: string) => api.post<ApiResponse<null>>("/api/auth/logout", { refreshToken }),
};

export const todoApi = {
  getAll: () => api.get<ApiResponse<Todo[]>>("/api/todos"),
  create: (data: TodoRequest) => api.post<ApiResponse<Todo>>("/api/todos", data),
  update: (id: string, data: TodoRequest) => api.put<ApiResponse<Todo>>(`/api/todos/${id}`, data),
  toggle: (id: string) => api.patch<ApiResponse<Todo>>(`/api/todos/${id}/toggle`),
  remove: (id: string) => api.delete<ApiResponse<null>>(`/api/todos/${id}`),
};

export const profileApi = {
  update: (data: UpdateProfileRequest) => api.put<ApiResponse<UserResponse>>("/api/users/me", data),
};

export const imageApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post<ApiResponse<ImageResult>>("/api/images", formData);
  },
  remove: (publicId: string) => api.delete<ApiResponse<null>>("/api/images", { data: { publicId } }),
};

export function getApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; fieldErrors?: Record<string, string> } | undefined;
    const validationMessage = data?.fieldErrors ? Object.values(data.fieldErrors)[0] : undefined;
    return validationMessage ?? data?.message ?? error.message ?? "Không thể kết nối máy chủ";
  }
  return "Đã xảy ra lỗi không xác định";
}
