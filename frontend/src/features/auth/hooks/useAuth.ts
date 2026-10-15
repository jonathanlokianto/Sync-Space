"use client";

import { LoginRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginRequest) => AuthAPI.loginUser(payload),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: AuthAPI.registerUser,
  });
}
