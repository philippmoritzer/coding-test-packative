import { useState } from "react";
import { BlogPost } from "../types/blogPost.type";
import { createBlogPost } from "../service/blog-post-api.service";

export function useCreatePost(onPostCreated: (newPost: BlogPost) => void) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const newPost = await createBlogPost(title, content);
      onPostCreated(newPost);
      setTitle("");
      setContent("");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
        setError((error as { message: string }).message);
      } else {
        setError("error.unknown");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    title,
    setTitle,
    description: content,
    setContent,
    isLoading,
    error,
    handleSubmit,
  };
}
