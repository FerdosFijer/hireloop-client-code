import Link from "next/link";

import { LogoFacebook } from "@gravity-ui/icons";
import { LogoLinkedin } from "@gravity-ui/icons";
import { LogoGithub } from "@gravity-ui/icons";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        {/* ================= MAIN FOOTER ================= */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Logo & Description */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-2xl font-bold tracking-tight"
            >
              <span className="text-[#1687e8]">hire</span>
              <span className="text-[#ffffff]">loop</span>
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-6 text-gray-500">
              The AI-native career platform. Built for people who take
              their work seriously.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-medium text-[#7065ff]">
              Product
            </h3>

            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/jobs"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Job discovery
                </Link>
              </li>

              <li>
                <Link
                  href="/ai"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Worker AI
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/salary"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigations */}
          <div>
            <h3 className="text-sm font-medium text-[#7065ff]">
              Navigations
            </h3>

            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/help"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Help center
                </Link>
              </li>

              <li>
                <Link
                  href="/career-library"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Career library
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-medium text-[#7065ff]">
              Resources
            </h3>

            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/brand-guideline"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="/newsroom"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Social Media */}
          <div className="flex gap-2">
            <Link
              href="#"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.04] text-gray-500 transition hover:bg-white/10 hover:text-white"
            >
              <LogoFacebook className="h-4 w-4" />
            </Link>

            <Link
              href="#"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.04] text-gray-500 transition hover:bg-white/10 hover:text-white"
            >
              <LogoLinkedin className="h-4 w-4" />
            </Link>

            <Link
              href="#"
              aria-label="Github"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.04] text-gray-500 transition hover:bg-white/10 hover:text-white"
            >
              <LogoGithub className="h-4 w-4" />
            </Link>
          </div>

          {/* Copyright + Policies */}
          <div className="flex flex-wrap items-center gap-5">
            <p className="text-[11px] text-gray-600">
              Copyright 2024 — hireloop client
            </p>

            <Link
              href="/terms"
              className="text-[11px] text-gray-600 transition hover:text-gray-300"
            >
              Terms & Policy
            </Link>

            <Link
              href="/privacy"
              className="text-[11px] text-gray-600 transition hover:text-gray-300"
            >
              Privacy Guideline
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;