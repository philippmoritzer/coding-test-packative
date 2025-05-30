"use client";
import BlogPostCard from "./BlogPostCard";
import { useBlogPost } from "@/app/blog/hooks/useBlogPost";

export default function PostDetail({ id, modal }: { id: string; modal?: boolean }) {
  const post = useBlogPost(id);

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