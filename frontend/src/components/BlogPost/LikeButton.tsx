import React, { useState } from "react";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
  onLikeUpdate: (newLikes: number) => void; 
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLikes, onLikeUpdate }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      //TODO: status code error handling
      const res = await fetch(`http://localhost:3001/blog/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "some-jwt-token",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to like the post");
      }

      const updatedPost = await res.json();
      setLikes(updatedPost.likes); 
      onLikeUpdate(updatedPost.likes);
    } catch (error) {
      console.error("Error liking the post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Liking..." : `Like (${likes})`}
    </button>
  );
};

export default LikeButton;