import Link from "next/link";
import type { TodoList } from "../app/todo/interfaces/todos.interface";
import React from "react";


const TodoList: React.FC<TodoList> = ({todos}) => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Todo List</h2>
      <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="p-4 flex justify-between items-center hover:bg-gray-100"
          >
            <div>
              <p className="text-lg font-medium text-gray-800">{todo.name}</p>
              <p className="text-sm text-gray-500">{todo.type}</p>
            </div>
            <span className="text-gray-400">#{todo.id}</span>
            <Link
              href={`/todo/${todo.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;