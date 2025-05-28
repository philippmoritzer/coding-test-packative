import React, { createContext, useState } from "react";

export const BlogContext = createContext<{ someContextValue: string }>({ someContextValue: "" });

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [someContextValue] = useState("This is from context!");
  return (
    <BlogContext.Provider value={{ someContextValue }}>
      {children}
    </BlogContext.Provider>
  );
};