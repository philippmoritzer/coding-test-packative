/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from "react";
import BlogPostCard from "../../components/BlogPost/BlogPostCard";
import CreatePostForm from "../../components/BlogPost/CreatePostForm";

function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<{ id: string; [key: string]: any }[]>([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await fetch("http://localhost:3001/blog/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authString") || "",
          },
        });

        //TODO: status code error handling
        if (!res.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data = await res.json();
        setBlogPosts(data.posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchBlogPosts();
  }, []);

  const handlePostCreated = (newPost: any) => {
    setBlogPosts((prevPosts) => [newPost, ...prevPosts]); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Blog Posts
        </h1>
        <CreatePostForm onPostCreated={handlePostCreated} />
        <div className="space-y-6">
          {blogPosts.map((post: any) => (
            <BlogPostCard key={post.id} blogPost={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;