export interface Profile {
  id: number;
  fullname: string;
  email: string;
  username: string;
  role?: string;
  max_room_limit?: number;
  is_premium?: boolean;
}

export interface UpdateProfileRequest {
    fullname?: string;
    email?: string;
    username?: string;
    password?: string;
}