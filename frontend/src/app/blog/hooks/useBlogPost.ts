import { useEffect, useState } from "react";
import axiosBlogInstance from "../util/axios-blog.interceptor";
import { BlogPost } from "../types/blogPost.type";

export function useBlogPost(id: string) {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    axiosBlogInstance.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  return post;
}
