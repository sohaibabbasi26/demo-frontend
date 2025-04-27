"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../../../../store/store"; // Adjust path
import { resetAuthState } from "@/store/slices/AuthSlice";
import Cookies from "js-cookie";
const ForceLogoutModal = () => {

  const isUnauthorized = useSelector((state: RootState) => state.auth.isUnauthorized);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  if (!isUnauthorized) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-black">Session Expired</h2>
        <p className="mb-6 text-gray-700">You`ve been logged out due to session timeout or authentication failure.</p>
        <button
          className="bg-[#BB90F0] text-white px-6 py-2 rounded hover:bg-red-700 transition"
          onClick={() => {
            dispatch(resetAuthState());
            Cookies.remove("accessToken")
            document.cookie = "refreshToken=; path=/; max-age=0";
            router.push("/login");   
            window.location.reload();
           
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ForceLogoutModal;
