'use client'

import Header from "@/components/misc/Header";
import BlogPage from "./blog/page";
import withAuth from "@/wrapper/withAuth";

function Main() { 
  return (
    <div >
      <Header />
      <BlogPage/>
    </div>
  );
}

export default withAuth(Main);
