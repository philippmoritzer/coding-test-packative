import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "../TodoList";

describe("TodoList Component", () => {
    const mockTodos = [
        { id: 1, name: "Test Todo 1", type: "Task" },
        { id: 2, name: "Test Todo 2", type: "Bug" },
      ];
  it("renders a list of todos", () => {
    render(      
      <TodoList todos={mockTodos} />      
    );

    console.log(screen.getByText("Test Todo 1").textContent)
    expect(screen.getByText("Test Todo 1")).toBeDefined()
    
  });


});