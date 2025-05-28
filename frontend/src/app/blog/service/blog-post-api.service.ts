import axiosInstance from "@/app/blog/util/axios-blog.interceptor";

export async function fetchBlogPosts(page: number, pageSize: number) {
  const res = await axiosInstance.get(
    `/posts?page=${page}&pageSize=${pageSize}`
  );
  return res.data;
}

export async function createBlogPost(title: string, content: string) {
  const res = await axiosInstance.post("/posts", { title, content });
  return res.data;
}

export async function likeBlogPost(postId: string) {
  const res = await axiosInstance.patch(`/posts/${postId}/like`);
  return res.data;
}

export async function fetchBlogPostById(id: string) {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
}
