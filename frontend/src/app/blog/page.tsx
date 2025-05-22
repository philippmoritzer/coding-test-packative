'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

function BlogPage() {

    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        
        async function fetchBlogPosts() {
        
        const res = await fetch('http://localhost:3001/blog/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'some-jwt-token'
            }
        })

        if(!res.ok) {
            throw new Error('Failed to fetch blog posts');
        }

        const data = await res.json();
        setBlogPosts(data.posts)
        }

        fetchBlogPosts()
    }, [])

    return <div className="text-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <div className="mt-4">
            {blogPosts.map((post: any) => (
                <div key={post.id} className="border p-4 mb-4">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    </div>
}

export default BlogPage;