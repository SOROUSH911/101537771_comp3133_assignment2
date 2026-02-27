export interface User {
  _id: string;
  username: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}
