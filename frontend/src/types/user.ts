export interface User {
  id: number;
  fullname: string;
  email: string;
  username: string;
  role?: string;
  max_room_limit?: number;
  is_premium?: boolean;
}

export interface UpdateUserRequest {
    fullname?: string;
    email?: string;
    username?: string;
    password?: string;
}