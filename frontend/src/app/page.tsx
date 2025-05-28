'use client'

import { useRouter } from "next/navigation";
import withAuth from "@/shared/components/withAuth";
import { useEffect } from "react";

function Main() { 
  const router = useRouter();

  useEffect(() => {
    router.replace('/blog')
  }, [router]);
  return null;
}

export default withAuth(Main);
