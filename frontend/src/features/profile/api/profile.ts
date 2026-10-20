import { api } from "@/lib/api";
import { BaseResponse, UpdateProfileRequest, Profile } from "@/types";

export const myProfileAPI = {
  async getMyProfile(): Promise<Profile> {
    const response = await api.get<BaseResponse<Profile>>("/profile/me");
    return response.data.data;
  },

  async updateMyProfile(payload: UpdateProfileRequest): Promise<Profile> {
    const response = await api.put<BaseResponse<Profile>>(
      "/profile/me",
      payload,
    );
    return response.data.data;
  },

  async deleteMyProfile(): Promise<void> {
    await api.delete<BaseResponse<Profile>>("/profile/me");
  },
};
