/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { ComponentProps, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return function AuthenticatedComponent(props: ComponentProps<any>) {
    const router = useRouter();
    const authString = useSelector((state: RootState) => state.auth.authString);
    const isRehydrated = useSelector((state: any) => state._persist?.rehydrated);

    useEffect(() => {
      if (isRehydrated && !authString) {
        router.replace("/login");
      }
    }, [authString, isRehydrated, router]);

    if (!isRehydrated) {
      // Optionally show a loading spinner here
      return null;
    }

    if (!authString) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;