/* eslint-disable @typescript-eslint/no-explicit-any */
// filepath: /Users/moritzerp/Projects/private/coding-test/frontend/src/utils/withAuth.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const authString = localStorage.getItem("authString");
      if (!authString) {
        router.push("/login");
      }
    }, [router]);

    const authString = localStorage.getItem("authString");
    if (!authString) {
      return null;
    }    


    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
