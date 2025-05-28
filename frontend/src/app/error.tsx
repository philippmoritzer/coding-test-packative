'use client';

import React from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-700 mb-6">
          {error?.message || "An unexpected error has occurred. Please try again later."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Try Again
          </button>
          <Link
            href="/blog"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded transition"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}