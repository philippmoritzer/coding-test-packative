'use client'

import Link from "next/link";

function Main() {
  const haneldLogout = () => {
    localStorage.removeItem("authString");
    window.location.href = "/login";
  };
  return (
    <div >
      <Link href="/todo">Go to do page</Link>      
      <button className="bg-blue-500" onClick={haneldLogout}>Logout</button>

    </div>
  );
}

export default Main;
