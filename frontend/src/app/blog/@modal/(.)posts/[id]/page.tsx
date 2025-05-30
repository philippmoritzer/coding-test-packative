"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Modal from "react-modal";
import PostDetail from "@/app/blog/components/PostDetail";
import { use } from 'react'

export default function PostDetailModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <Modal
      isOpen
      onRequestClose={() => router.back()}
      ariaHideApp={false}
      style={{
        overlay: {
          zIndex: 1000,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          inset: "unset",
          padding: 0,
          border: "none",
          background: "transparent",
          overflow: "visible",
          width: "auto",
          height: "auto",
          maxWidth: "90vw",
          maxHeight: "90vh",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <div className="relative w-full h-full max-w-3xl max-h-[90vh] min-w-[400px] min-h-[400px] bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center items-stretch overflow-auto">
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          aria-label="Close"
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
        <PostDetail id={id} modal />
      </div>
    </Modal>
  );
}