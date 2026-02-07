// Shared types between backend and frontends
export interface User {
  id: string;
  email: string;
  name: string;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
