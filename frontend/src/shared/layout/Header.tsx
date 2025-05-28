'use client';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Current user: {username || "Guest"}</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700 py-2 px-4 rounded-lg transition duration-300"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;