/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoDetailPage({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await fetch(`http://localhost:3001/todo/${params.id}`, {
          method: "GET",
          headers: {
            "Authorization": localStorage.getItem("authString") || "",
            "Cache-Control": "no-cache"
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch todo");
        }

        const data = await res.json();
        setTodo(data);
      } catch (error) {
        console.error("Error fetching todo:", error);
        router.push("/todo"); 
      }
    }

    fetchTodo();
  }, [params.id, router]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Todo Detail</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{todo.name}</h2>
        <p className="text-lg text-gray-700 mb-2">Type: {todo.type}</p>
        <p className="text-sm text-gray-500">ID: {todo.id}</p>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => router.push("/todo")}
          className="text-blue-500 hover:underline text-lg font-medium"
        >
          Back to Todo List
        </button>
      </div>
    </div>
  );
}