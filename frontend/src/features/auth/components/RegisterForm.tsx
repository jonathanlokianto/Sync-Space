"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { useRegister } from "../hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  const router = useRouter();
  const { mutate: doRegister, isPending, error } = useRegister();

  const handleRegister = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    doRegister(formData, {
      onSuccess: () => {
        alert("Registration success! Please login using your new account.");
        router.push(ROUTES.LOGIN);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "username") {
      processedValue = value.replace(/[^a-zA-Z0-9_]/g, "");
    } else if (name === "fullname") {
      processedValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "email") {
      processedValue = value.replace(/[^a-zA-Z0-9@._-]/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  return (
    <>
      <h1 className="font-extrabold text-gray-800 text-xl mb-4 justify-center">
        Register to Sync Space
      </h1>

      <form onSubmit={handleRegister} className="space-y-4 text-left">
        <Input
          label="Fullname"
          name="fullname"
          value={formData.fullname}
          type="text"
          onChange={handleChange}
          placeholder="Enter your name"
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          type="text"
          onChange={handleChange}
          placeholder="Enter your E-Mail Address"
        />

        <Input
          label="Username"
          name="username"
          value={formData.username}
          type="text"
          onChange={handleChange}
          placeholder="Enter your name"
        />
        <Input
          label="Password"
          name="password"
          value={formData.password}
          type="password"
          onChange={handleChange}
          placeholder="Enter your password"
        />

        {error && (
          <p className="text-red-500 text-sm font-medium">
            Registration failed. Please check your inputs.
          </p>
        )}

        <Button
          variant="primary"
          isLoading={isPending}
          className="mt-4"
          type="submit"
        >
          Sign Up
        </Button>
      </form>

      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-gray-400" />
        <span className="px-3 whitespace-nowrap text-gray-400 text-sm">
          Already have an account?
        </span>
        <div className="flex-1 border-t border-gray-400" />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => router.push(ROUTES.LOGIN)}
      >
        Sign In
      </Button>
    </>
  );
}
