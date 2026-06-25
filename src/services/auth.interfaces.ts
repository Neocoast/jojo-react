export interface SignupPayload {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  tags: string[];
}

export interface SignupResponse {
  data: {
    id: number;
    email: string;
    name: string;
  }
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    id: number;
    email: string;
    name: string;
  }
}

export type User = LoginResponse['data'];

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface MeResponse {
  id: number;
  name: string;
  email: string;
  favorite_tags: { id: number; slug: string }[];
  followed: boolean;
  followers: MeResponse[];
  followees: MeResponse[];
}
