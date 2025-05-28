import Header from "@/shared/layout/Header";
import React, { ReactNode } from "react";

export default function BlogLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
  <div>
    <Header/>    
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Blog Posts
          </h1>
        { children }
        { modal }
    </div>
  </div>
  );

}