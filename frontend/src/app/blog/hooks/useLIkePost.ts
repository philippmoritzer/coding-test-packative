import { useState } from "react";
import { likeBlogPost } from "../service/blog-post-api.service";

export function useLikePost(
  postId: string,
  initialLikes: number,
  onLikeUpdate: (newLikes: number) => void
) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLike = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedPost = await likeBlogPost(postId);
      setLikes(updatedPost.likes);
      onLikeUpdate(updatedPost.likes);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
        setError((error as { message: string }).message);
      } else {
        setError("error.unknown");
      }
      console.error("Error liking the post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { likes, isLoading, error, handleLike };
}
