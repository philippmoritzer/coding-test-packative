"use client";

import { useState } from "react";
import { useLogin } from "./hooks/handleLogin";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error, setError } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous error before attempting login
    handleLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Block Posts
        </h1>
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-black"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(""); 
              }}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); 
              }}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
        </p>
      </div>
    </div>
  );
}