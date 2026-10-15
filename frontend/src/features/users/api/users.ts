import { api } from "@/lib/api";
import { BaseResponse, UpdateUserRequest, User } from "@/types";

export const UsersAPI = {
  async GetMyProfile(): Promise<User> {
    const response = await api.get<BaseResponse<User>>("/users/me");
    return response.data.data;
  },

  async UpdateMyProfile(payload: UpdateUserRequest): Promise<User> {
    const response = await api.put<BaseResponse<User>>("/users/me");
    return response.data.data;
  },
};
