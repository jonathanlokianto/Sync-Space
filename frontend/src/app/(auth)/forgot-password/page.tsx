"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");

  return (
    <>
      <h1 className="font-extrabold text-gray-800 text-xl mb-4 justify-center">
        Find Your Account
      </h1>

      <form className="space-y-4 text-left">
        <p className="text-sm text-gray-500 mb-6">
          Enter your registered email address. We will send a confirmation
          email.
        </p>
        <div className="space-y-1">
          <input
            className="transition-colors w-full text-black text-sm 
                    px-4 py-2.5 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 outline-none "
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your email address"
          />
        </div>

        <button
          className="transition-colors w-full bg-blue-600 hover:bg-blue-300
                    px-4 py-2.5 rounded-2xl mt-4
                    text-white border border-gray-300 outline-none
                    "
          type="submit"
        >
          Continue
        </button>
      </form>
    </>
  );
}
