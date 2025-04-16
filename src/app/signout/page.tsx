"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutConfirmationPage() {
  const router = useRouter();

  const handleYes = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleNo = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center text-black h-[80vh]">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px] mt-20 relative p-10">
        <button
          onClick={handleNo}
          className="absolute top-1 right-3 text-gray-600 hover:text-gray-800 text-3xl font-bold"
        >
          &times;
        </button>

        <h1 className="text-2xl text-center font-bold mb-5">Log Out</h1>
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Are you sure you want to log out?</h2>

        <div className="flex justify-between mt-6">
          <button 
            type="submit" 
            className="w-full bg-orange-500 text-white py-3 rounded-lg mt-5 hover:bg-orange-600 transition"  
            onClick={handleYes}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}