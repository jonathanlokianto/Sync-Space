"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useLogin } from "../hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useNotification } from "@/context/notification/context/NotificationContext";
import { session } from "@/lib/session";

export function LoginForm() {
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    identity: "",
    password: "",
  });
  const router = useRouter();
  const { mutate: doLogin, error, isPending } = useLogin();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    doLogin(formData, {
      onSuccess: (response) => {
        // alert("User logged in successfully!");
        const token = response.access_token;
        session.setToken(token);
        showNotification({
          title: "Login Success",
          message: "You being redirected to the dashboard. Please wait.",
          variant: "success",
        });
        router.push(ROUTES.DASHBOARD);
      },
      onError: (error) => {
        showNotification({
          title: "Error",
          message: String(error),
          variant: "error",
        });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <h1 className="font-extrabold text-gray-800 text-xl mb-4 justify-center">
        Login to Sync Space
      </h1>
      <form className="space-y-4 text-left" onSubmit={handleSubmit}>
        <Input
          label="Username or Email"
          name="identity"
          type="text"
          value={formData.identity}
          onChange={handleChange}
          placeholder="Enter Username or Email"
          required
        />

        <Input
          label="Password"
          name="password"
          value={formData.password}
          type="password"
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />

        {error && (
          <p className="text-red-500 text-sm font-medium">
            Failed to log in. Please check your username/email and password.
          </p>
        )}

        <Button type="submit" variant="primary" isLoading={isPending}>
          Log In
        </Button>
      </form>

      {/* <div className="transition-colors flex justify-end mb-2 ">
        <Link
          className="transition-colors text-gray-600 hover:text-gray-400"
          href={ROUTES.FORGOT_PASSWORD}
        >
          Forgot Password?
        </Link>
      </div> */}

      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-gray-400" />
        <span className="px-3 whitespace-nowrap text-gray-400 text-sm">
          Don&apos;t have account yet?
        </span>
        <div className="flex-1 border-t border-gray-400" />
      </div>
      <Button
        className="mt-4"
        type="button"
        variant="outline"
        onClick={() => router.push(ROUTES.REGISTER)}
      >
        Create New Account
      </Button>
    </>
  );
}
