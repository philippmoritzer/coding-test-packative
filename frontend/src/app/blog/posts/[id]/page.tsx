"use client"

import React from "react";
import PostDetail from "@/app/blog/components/PostDetail";

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <div className="container mx-auto py-10">
      <PostDetail id={id} />
    </div>
  );
}