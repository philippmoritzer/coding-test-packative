"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import TodoList from "../../components/TodoList";


function TodoPage() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch('http://localhost:3001/todo/list', {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('authString') || '',
          'Cache-Control': 'no-cache',
        },
      })
      if(!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      setTodos(data.todoItems);      
    }

    fetchTodos();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Todo Page</h1>
      <TodoList todos={todos} />
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-blue-500 hover:underline text-lg font-medium"
        >
          Go back to Main Page
        </Link>
      </div>
    </div>
  );
}

export default TodoPage;


