import { createContext, useContext, useState, type ReactNode } from "react";

import { authApi } from "../services/api";
import type { LoginRequest, RegisterRequest, User } from "../types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getStoredUser(): User | null {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);

  const isAuthenticated = Boolean(user && localStorage.getItem("accessToken"));

  async function login(data: LoginRequest): Promise<void> {
    const response = await authApi.login(data);
    const result = response.data.result;

    const loggedInUser: User = {
      userId: result.userId,
      email: result.email,
      displayName: result.displayName,
      avatarUrl: result.avatarUrl,
      avatarPublicId: result.avatarPublicId,
      roleTitle: result.roleTitle,
      bio: result.bio,
    };

    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);
  }

  async function register(data: RegisterRequest): Promise<void> {
    await authApi.register(data);

    // Đăng ký thành công thì tự động đăng nhập
    await login({
      email: data.email,
      password: data.password,
    });
  }

  async function logout(): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } finally {
      // Vẫn xóa dữ liệu local kể cả khi backend gặp lỗi
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      setUser(null);
    }
  }

  function updateUser(updatedUser: User): void {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }

  return context;
}
