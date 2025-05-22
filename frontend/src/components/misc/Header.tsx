'use client';

import React from "react";

const Header: React.FC = () => {
  const username = localStorage.getItem("authUser"); 

  const handleLogout = () => {
    localStorage.removeItem("authUser"); 
    localStorage.removeItem("authString");
    window.location.href = "/login";
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Curret user: {username || "Guest"}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;