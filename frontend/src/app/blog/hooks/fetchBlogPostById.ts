import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { BlogPost } from "../types/blogPost.type";
import { BlogContext } from "../contexts/BlogContext";
import { fetchBlogPostById } from "../service/blog-post-api.service";

export function useBlogPostById() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { someContextValue } = useContext(BlogContext);

  useEffect(() => {
    if (!id) return;
    fetchBlogPostById(id)
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [id]);

  return { post, error, someContextValue };
}
