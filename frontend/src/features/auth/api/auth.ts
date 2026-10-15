import { api } from "@/lib/api";
import {
  AuthResponse,
  BaseResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types";

export const AuthAPI = {
  async loginUser(payload: LoginRequest): Promise<AuthResponse> {
    // const response = await api.post("/auth/login", payload);
    const response = await api.post<BaseResponse<AuthResponse>>(
      "/auth/login",
      payload,
    );
    return response.data.data;

    // const authData = response.data.data;
    // if (authData.access_token) {
    //   session.setToken(authData.access_token);
    // }
    // return authData;
  },

  async registerUser(payload: RegisterRequest): Promise<void> {
    await api.post<BaseResponse<AuthResponse>>("/auth/register", payload);
  },
};
