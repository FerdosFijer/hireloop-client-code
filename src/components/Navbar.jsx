"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data: session, isPending} = useSession();
  console.log(session, isPending);
  
  const user= session?.user;

  const handleSignOut = async () => {
    await signOut()
  }

  const navItems = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Company",
      href: "/companies",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#202020]">
      <header className="mx-auto flex h-11.25 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* LEFT - LOGO */}
        <Link href="/"className="flex items-center text-2xl font-bold tracking-tight">
          <span className="text-[#1687e8]">hire</span>
          <span className="text-[#ffffff]">loop</span>
        </Link>

        {/* DESKTOP RIGHT SIDE */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Main Navigation Box */}
          <div className="flex items-center rounded-full border border-white/5 bg-white/2 px-1.5 ">
            {navItems.map((item) => (
              <Link key={item.label}  href={item.href} 
                className="rounded-md px-3.5 py-1.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/5 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-white/15" />
        {
          user ? 
          <>
          Hi, {user.name}
          <Button variant="ghost" onClick={handleSignOut}> SignOut</Button>

          </>:<>
           {/* Sign In */}
          <Link href="/auth/signin" className="text-sm font-medium text-[#8075ff] transition-colors hover:text-[#968cff]"> Sign In </Link>

          {/* Get Started */}
          <Link href="/auth/signup" className="rounded-full bg-[#635BFF] px-4 py-1.5 text-sm font-medium text-white shadow-lg shadow-[#635BFF]/20 transition-all hover:bg-[#554CFF] hover:shadow-[#635BFF]/30">
            Get Started
          </Link>
          </>
        }
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#202020] px-5 py-3 lg:hidden">

          {/* Navigation Box */}
          <div className="rounded-lg border border-white/10 bg-white/2 p-1.5">

            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}
                className="block rounded-md px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white" >
                {item.label}
              </Link>
            ))}

          </div>

          {/* Mobile Actions */}
          <div className="mt-3 flex flex-col gap-2">
              {
          user ? 
          <>
          Hi, {user.name}
          <Button variant="ghost" onClick={handleSignOut}> SignOut</Button>

          </>:<>
           <Link
              href="/auth/signin"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg border border-white/10 py-2.5 text-center text-sm font-medium text-[#8075ff] transition hover:bg-white/5"
            >
              Sign In
            </Link>

            <Link
              href="/auth/signup"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg bg-[#635BFF] py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#554CFF]"
            >
              Get Started
            </Link>
          </>
        }

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;