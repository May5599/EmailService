"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Blend } from "lucide-react";
import { auth, provider, signInWithPopup } from "../lib/firbase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#1E293B] text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-3xl font-bold tracking-wide">
          <Blend size={32} strokeWidth={2} />
          <span className="text-white">NotifyX</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-lg">
          {["Dashboard", "Schedule", "Status"].map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="relative hover:text-blue-400 transition duration-300 after:block after:h-[2px] after:bg-blue-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Authentication */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Image
                src={user.photoURL}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border border-gray-400"
              />
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300"
            >
              Sign in with Google
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1E293B] py-4">
          <ul className="text-center space-y-4 text-lg">
            {["Dashboard", "Schedule", "Status"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="block hover:text-blue-400 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
            {user ? (
              <li>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300 w-full"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={handleSignIn}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300 w-full"
                >
                  Sign in with Google
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
