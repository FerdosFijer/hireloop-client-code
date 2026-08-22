"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin"
  };

  const navLinks = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Companies",
      href: "/companies",
    },
    {
      label: "Pricing",
      href: "/plans",
    },
  ];

  if (user?.email) {
    navLinks.push({
      label: "Dashboard",
      href: dashboardLinks[user.role] || "/dashboard/seeker",
    });
  }

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#202020]">
      <header className="mx-auto flex h-11.25 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center text-2xl font-bold tracking-tight"
        >
          <span className="text-[#1687e8]">hire</span>
          <span className="text-white">loop</span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center rounded-full border border-white/5 bg-white/2 px-1.5">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3.5 py-1.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-white/15" />

          {isPending ? (
            <div className="text-sm text-gray-400">Loading...</div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-white">
                Hi, {user.name}
              </span>

              <Button variant="ghost" onPress={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-[#8075ff] transition-colors hover:text-[#968cff]"
              >
                Sign In
              </Link>

              <Link
                href="/auth/signup"
                className="rounded-full bg-[#635BFF] px-4 py-1.5 text-sm font-medium text-white"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 lg:hidden"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#202020] px-5 py-3 lg:hidden">
          <div className="rounded-lg border border-white/10 bg-white/2 p-1.5">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {isPending ? (
              <div className="text-center text-sm text-gray-400">
                Loading...
              </div>
            ) : user ? (
              <>
                <div className="text-center text-white">
                  Hi, {user.name}
                </div>

                <Button variant="ghost" onPress={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg border border-white/10 py-2.5 text-center text-sm font-medium text-[#8075ff]"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-[#635BFF] py-2.5 text-center text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;