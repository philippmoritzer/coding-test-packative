import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { useRouter } from "next/navigation";

const validUsers = [
  { username: "admin", password: "admin" },
  { username: "john", password: "doe" },
];

export function useLogin() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = (username: string, password: string) => {
    const user = validUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      dispatch(
        login({
          user: username,
          authString:
            user.username === "admin"
              ? "userId:some-userid;permissions:create:blog-post;"
              : "userId:some-userid;permissions:view:blog-post;",
        })
      );
      router.push("/");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return { handleLogin, error, setError };
}