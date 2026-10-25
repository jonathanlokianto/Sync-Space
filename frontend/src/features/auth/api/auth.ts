import { api } from "@/lib/api";
import {
  AuthResponse,
  BaseResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types";
import { MOCK_USERS } from "./auth.mock";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const AuthAPI = {
  async loginUser(payload: LoginRequest): Promise<AuthResponse> {
    if (USE_MOCK) {
      await new Promise((response) => setTimeout(response, 400));
      const foundUser = MOCK_USERS.find(
        (u) => u.email === payload.identity || u.username === payload.identity,
      );

      if (!foundUser) {
        throw new Error("User Not Found (Mock)");
      }

      return {
        access_token: "mock-jwt-token-12345",
        user: foundUser,
      } as unknown as AuthResponse;
    }

    const response = await api.post<BaseResponse<AuthResponse>>(
      "/auth/login",
      payload,
    );
    return response.data.data;
  },

  async registerUser(payload: RegisterRequest): Promise<void> {
    if (USE_MOCK) {
      await new Promise((response) => setTimeout(response, 400));
      console.log("[MOCK] User registered successfully with payload:", payload);
      return;
    }

    await api.post<BaseResponse<AuthResponse>>("/auth/register", payload);
  },
};
