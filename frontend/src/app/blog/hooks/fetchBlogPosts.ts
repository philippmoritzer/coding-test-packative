import { useEffect } from "react";
import { BlogPost } from "../types/blogPost.type";
import { fetchBlogPosts as fetchBlogPostsService } from "../service/blog-post-api.service";

export function useFetchBlogPosts(
  setBlogPosts: (posts: BlogPost[]) => void,
  setTotal: (total: number) => void,
  page: number = 1,
  pageSize: number = 10,
  setError?: (msg: string) => void
) {
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const data = await fetchBlogPostsService(page, pageSize);
        setBlogPosts(data.posts);
        setTotal(data.total || 0);
      } catch (error: unknown) {
        console.error("Error fetching blog posts:", error);
        setBlogPosts([]);
        setTotal(0);
        if (
          setError &&
          error &&
          typeof error === "object" &&
          "message" in error
        ) {
          setError((error as { message: string }).message);
        }
      }
    }

    fetchBlogPosts();
  }, [page, pageSize, setBlogPosts, setTotal, setError]);
}
