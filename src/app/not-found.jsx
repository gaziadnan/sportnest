"use client";

import Link from "next/link";

import {
  FaHome,
} from "react-icons/fa";

export default function NotFound() {
  return (
    <section
      className="
        min-h-screen
        bg-gradient-to-b
        from-[#020817]
        via-[#071120]
        to-[#020817]
        flex
        items-center
        justify-center
        px-2
        overflow-hidden
        relative
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          w-[400px]
          h-[400px]
          bg-cyan-500/10
          blur-[120px]
          rounded-full
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          text-center
          max-w-xl
        "
      >
        {/* 404 */}
        <h1
          className="
            text-[100px]
            md:text-[150px]
            font-black
            leading-none
            text-white
            drop-shadow-[0_0_25px_rgba(6,182,212,0.45)]
          "
        >
          404
        </h1>

        {/* TITLE */}
        <h2
          className="
            text-2xl
            md:text-3xl
            font-bold
            text-white
            mt-2
          "
        >
          Page Not Found
        </h2>

        {/* LINE */}
        <div
          className="
            w-20
            h-1
            rounded-full
            bg-cyan-400
            mx-auto
            mt-5
          "
        />

        {/* DESCRIPTION */}
        <p
          className="
            text-gray-400
            text-sm
            md:text-base
            leading-7
            mt-6
          "
        >
          Oops! The page you are
          looking for doesn’t
          exist or may have been
          moved. Let’s get you
          back to the home page.
        </p>

        {/* BUTTON */}
        <Link
          href="/"
          className="
            inline-flex
            items-center
            justify-center
            gap-3
            mt-10
            h-[52px]
            px-8
            rounded-2xl
            bg-gradient-to-r
            from-cyan-400
            to-emerald-400
            hover:scale-105
            transition-all
            duration-300
            text-white
            font-semibold
            shadow-[0_10px_40px_rgba(6,182,212,0.35)]
          "
        >
          <FaHome />

          Go To Home
        </Link>
      </div>

      {/* BOTTOM SHADOW */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-32
          bg-gradient-to-t
          from-cyan-500/10
          to-transparent
        "
      />
    </section>
  );
}