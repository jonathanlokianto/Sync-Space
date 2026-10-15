import { api } from "@/lib/api";
import { BaseResponse, UpdateUserRequest, User } from "@/types";

export async function updateAccount(payload: UpdateUserRequest): Promise<User> {
  const response = await api.put<BaseResponse<User>>("/users/me", payload);
  return response.data.data;
}