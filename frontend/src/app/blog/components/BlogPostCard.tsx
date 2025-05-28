import React, { useState } from "react";
import LikeButton from "@/app/blog/components/LikeButton";
import { BlogPostCardProps } from "@/app/blog/types/blogPost.type";
import Link from "next/link";



const BlogPostCard: React.FC<BlogPostCardProps> = ({ blogPost }) => {
  const [likes, setLikes] = useState(blogPost.likes);

  const handleLikeUpdate = (newLikes: number) => {
    setLikes(newLikes); 
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      <Link href={`/blog/${blogPost.id}`}  scroll={false}>
        {blogPost.title}
      </Link>
    </h2>
      <p className="text-gray-600 text-sm mb-4">
        {blogPost.content.length > 1000
          ? `${blogPost.content.substring(0, 1000)}...`
          : blogPost.content}
      </p>
      <div className="text-gray-500 text-xs mb-2">
        Created by: <span className="font-medium">{blogPost.createdBy}</span>
      </div>
      <div className="text-gray-500 text-xs">
        Created at:{" "}
        <span className="font-medium">
          {new Date(blogPost.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <LikeButton
          postId={blogPost.id}
          initialLikes={likes}
          onLikeUpdate={handleLikeUpdate}
        />
        <span className="text-gray-500 text-sm">
          Updated at: {new Date(blogPost.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default BlogPostCard;