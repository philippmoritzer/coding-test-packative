'use client';

import { useState } from "react";
import BlogPostCard from "@/app/blog/components/BlogPostCard";
import CreatePostForm from "./components/CreatePostForm";
import { useFetchBlogPosts } from "./hooks/fetchBlogPosts";
import { usePaginationParams } from "./hooks/usePaginationParams";
import { BlogPost } from "./types/blogPost.type";
import PaginationNav from "./components/PaginationNav";
import withAuth from "@/shared/components/withAuth";
import '@/i18n'

const PAGE_SIZE = 10;

function BlogPageContent({ page, setPage }: { page: number; setPage: (p: number) => void }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);

  useFetchBlogPosts(setBlogPosts, setTotal, page, PAGE_SIZE);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handlePostCreated = (newPost: BlogPost) => {
    setBlogPosts((prevPosts) => [newPost, ...prevPosts]);
    setTotal((prevTotal) => prevTotal + 1);
  };

  return (
    <div className="container mx-auto px-4">
      <CreatePostForm onPostCreated={handlePostCreated} />
      <PaginationNav
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <div className="space-y-6">
        {blogPosts.map((post: BlogPost) => (
          <BlogPostCard key={post.id} blogPost={post} shortenContent={true}/>
        ))}
      </div>
      <PaginationNav
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

function BlogPage() {
  const { page, setPage } = usePaginationParams(1);
  return <BlogPageContent page={page} setPage={setPage} />;
}

export default withAuth(BlogPage);