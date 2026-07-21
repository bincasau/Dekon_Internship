export interface ApiResponse<T> {
  timestamp: string;
  code: number;
  message: string;
  result: T;
}

export interface User {
  userId: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  avatarPublicId?: string;
  roleTitle: string;
  bio?: string;
}

export interface AuthResult extends User {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  displayName: string;
  email: string;
  password: string;
}

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Category = "WORK" | "PERSONAL" | "STUDY" | "HEALTH" | "OTHER";

export interface TodoRequest {
  title: string;
  description?: string;
  priority?: Priority;
  category?: Category;
  dueAt?: string;
}

export interface Todo extends TodoRequest {
  id: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  roleTitle?: string;
  bio?: string;
}

export interface ImageResult {
  publicId: string;
  url: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
}

export interface UserResponse {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  avatarPublicId?: string;
  roleTitle: string;
  bio?: string;
  provider: "LOCAL" | "GOOGLE";
  enabled: boolean;
  createdAt: string;
}
