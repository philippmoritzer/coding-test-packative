'use client';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { Trans, useTranslation } from "react-i18next";
import React from "react";

const Header: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold"><Trans>auth.currentUser</Trans> {username || "Guest"}</h1>
      <div className="flex items-center gap-4">
        <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className="bg-white text-blue-600 border border-blue-600 rounded-lg px-2 py-1 mr-2"
        >
          <option value="en">EN</option>
          <option value="de">DE</option>
          <option value="kr">KR</option>
        </select>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700 py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;