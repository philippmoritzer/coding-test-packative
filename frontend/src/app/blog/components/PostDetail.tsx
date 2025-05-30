"use client";
import { useEffect, useState } from "react";
import axiosBlogInstance from "../util/axios-blog.interceptor";
import BlogPostCard from "./BlogPostCard";
import { BlogPost } from "../types/blogPost.type";

export default function PostDetail({ id, modal }: { id: string; modal?: boolean }) {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    axiosBlogInstance.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const card = (
    <BlogPostCard
      blogPost={post}
      shortenContent={false}
      disableLink={true}
      fullWidth={!modal}
    />
  );

  return modal ? (
    <div className="w-full max-w-5xl mx-auto px-4">{card}</div>
  ) : (
    card
  );
}