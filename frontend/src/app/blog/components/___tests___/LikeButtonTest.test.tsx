import React from "react";
import { render, screen,  } from "@testing-library/react";
import "@testing-library/jest-dom";
import LikeButton from "../LikeButton";

global.fetch = jest.fn();

describe("LikeButton Component", () => {
  const mockOnLikeUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the LikeButton with initial likes", () => {
    render(<LikeButton postId="123" initialLikes={5} onLikeUpdate={mockOnLikeUpdate} />);
    expect(screen.getByText("Like (5)")).toBeInTheDocument();
  });
 
});