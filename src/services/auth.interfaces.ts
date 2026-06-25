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
