import React from "react";
import { useLikePost } from "../hooks/useLIkePost";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
  onLikeUpdate: (newLikes: number) => void; 
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLikes, onLikeUpdate }) => {
    const { likes, isLoading, handleLike } = useLikePost(postId, initialLikes, onLikeUpdate);


  return (
    <button
      onClick={handleLike}
      className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Liking..." : `Like (${likes})`}
    </button>
  );
};

export default LikeButton;