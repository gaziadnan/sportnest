"use client";

import Link from "next/link";

import Image from "next/image";

import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import {
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();

  const [mounted, setMounted] =
    useState(false);

  const [isOpen, setIsOpen] =
    useState(false);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: session,
  } = authClient.useSession();

  const user = session?.user;

  /* LOGOUT */
  const handleLogout = async () => {
    await authClient.signOut();

    window.location.href = "/";
  };

  /* NAV LINKS */
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "All Facilities",
      path: "/facilities",
    },

    ...(user
      ? [
          {
            name: "My Bookings",
            path: "/my-bookings",
          },

          {
            name: "Add Facility",
            path: "/add-facility",
          },

          {
            name: "Manage Facilities",
            path:
              "/manage-facilities",
          },
        ]
      : []),
  ];

  /* SAFE IMAGE CHECK */
  const isValidImage =
    typeof user?.image === "string" &&
    (user.image.startsWith(
      "http://"
    ) ||
      user.image.startsWith(
        "https://"
      ) ||
      user.image.startsWith("/"));

  /* INITIAL */
  const initial =
    user?.name?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
      "
    >
      {/* NAVBAR */}
      <div
        className="
          w-full
          border-b
          border-cyan-500/10
          bg-gradient-to-r
          from-[#06111f]
          via-[#07192d]
          to-[#06111f]
          backdrop-blur-xl
          shadow-[0_6px_30px_rgba(0,0,0,0.35)]
        "
      >
        {/* CONTENT */}
        <nav
          className="
            w-full
            max-w-[1400px]
            mx-auto
            h-[68px]
            flex
            items-center
            justify-between
            px-4
            lg:px-2
          "
        >
          {/* LOGO */}
          <Link href="/">
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="
                cursor-pointer
                flex-shrink-0
              "
            >
              <h1
                className="
                  text-[31px]
                  font-black
                  tracking-tight
                  leading-none
                "
              >
                <span className="text-white">
                  Sport
                </span>

                <span className="text-cyan-400">
                  Nest
                </span>
              </h1>
            </motion.div>
          </Link>

          {/* DESKTOP MENU */}
          <div
            className="
              hidden
              lg:flex
              items-center
              gap-9
            "
          >
            {navLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="
                  relative
                  group
                "
              >
                <span
                  className={`
                    text-[17px]
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      pathname ===
                      item.path
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-400"
                    }
                  `}
                >
                  {item.name}
                </span>

                <span
                  className={`
                    absolute
                    left-0
                    -bottom-[7px]
                    h-[2px]
                    bg-cyan-400
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      pathname ===
                      item.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              flex
              items-center
              gap-4
              flex-shrink-0
            "
          >
            {/* LOGIN BUTTON */}
            {!mounted ? null : !user ? (
              <Link href="/login">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    hidden
                    md:flex
                    items-center
                    justify-center
                    px-6
                    h-[40px]
                    rounded-lg
                    bg-cyan-400
                    text-black
                    font-bold
                    text-[15px]
                    transition-all
                    duration-300
                    hover:bg-cyan-300
                    hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]
                  "
                >
                  Login
                </motion.button>
              </Link>
            ) : (
              /* USER PROFILE */
              <div className="relative hidden lg:block">
                <button
                  onClick={() =>
                    setDropdownOpen(
                      !dropdownOpen
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-3
                    py-2
                    hover:bg-white/10
                    transition-all
                    duration-300
                  "
                >
                  {/* IMAGE */}
                  {isValidImage ? (
                    <Image
                      src={user.image}
                      alt="user"
                      width={42}
                      height={42}
                      unoptimized
                      className="
                        w-[42px]
                        h-[42px]
                        rounded-full
                        object-cover
                        border
                        border-cyan-400/30
                      "
                    />
                  ) : (
                    <div
                      className="
                        w-[42px]
                        h-[42px]
                        rounded-full
                        bg-cyan-400
                        text-black
                        font-black
                        flex
                        items-center
                        justify-center
                        text-lg
                      "
                    >
                      {initial}
                    </div>
                  )}

                  {/* NAME */}
                  <div className="text-left">
                    <p
                      className="
                        text-white
                        font-semibold
                        text-sm
                        leading-none
                      "
                    >
                      {user?.name}
                    </p>

                    <p
                      className="
                        text-gray-400
                        text-xs
                        mt-1
                      "
                    >
                      Athlete
                    </p>
                  </div>

                  <FaChevronDown
                    className={`
                      text-gray-400
                      text-sm
                      transition-all
                      duration-300
                      ${
                        dropdownOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>

                {/* DROPDOWN */}
                {dropdownOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      mt-4
                      w-[260px]
                      rounded-3xl
                      border
                      border-white/10
                      bg-[#081424]
                      backdrop-blur-xl
                      overflow-hidden
                      shadow-[0_0_40px_rgba(0,0,0,0.45)]
                    "
                  >
                    {/* TOP */}
                    <div
                      className="
                        p-5
                        border-b
                        border-white/10
                        flex
                        items-center
                        gap-4
                      "
                    >
                      {isValidImage ? (
                        <Image
                          src={user.image}
                          alt="user"
                          width={55}
                          height={55}
                          unoptimized
                          className="
                            w-[55px]
                            h-[55px]
                            rounded-full
                            object-cover
                            border
                            border-cyan-400/30
                          "
                        />
                      ) : (
                        <div
                          className="
                            w-[55px]
                            h-[55px]
                            rounded-full
                            bg-cyan-400
                            text-black
                            font-black
                            flex
                            items-center
                            justify-center
                            text-2xl
                          "
                        >
                          {initial}
                        </div>
                      )}

                      <div>
                        <h3
                          className="
                            text-white
                            font-bold
                          "
                        >
                          {user?.name}
                        </h3>

                        <p
                          className="
                            text-gray-400
                            text-sm
                            mt-1
                            break-all
                          "
                        >
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    {/* MENU */}
                    <div className="p-3">
                      <Link
                        href="/my-bookings"
                        className="
                          flex
                          items-center
                          px-4
                          py-3
                          rounded-xl
                          text-gray-300
                          hover:bg-white/5
                          hover:text-cyan-400
                          transition-all
                        "
                      >
                        My Bookings
                      </Link>

                      <Link
                        href="/add-facility"
                        className="
                          flex
                          items-center
                          px-4
                          py-3
                          rounded-xl
                          text-gray-300
                          hover:bg-white/5
                          hover:text-cyan-400
                          transition-all
                        "
                      >
                        Add Facility
                      </Link>

                      <Link
                        href="/manage-facilities"
                        className="
                          flex
                          items-center
                          px-4
                          py-3
                          rounded-xl
                          text-gray-300
                          hover:bg-white/5
                          hover:text-cyan-400
                          transition-all
                        "
                      >
                        Manage Facilities
                      </Link>

                      <button
                        onClick={
                          handleLogout
                        }
                        className="
                          mt-2
                          w-full
                          h-[48px]
                          rounded-xl
                          bg-cyan-400
                          text-black
                          font-bold
                          hover:bg-cyan-300
                          transition-all
                        "
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE BUTTON */}
            <button
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="
                lg:hidden
                text-white
                text-2xl
              "
            >
              {isOpen ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {isOpen && (
          <div
            className="
              lg:hidden
              border-t
              border-white/10
              px-4
              py-6
              bg-[#07192d]
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5
              "
            >
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className={`
                    text-[17px]
                    font-medium
                    transition-all
                    duration-300
                    ${
                      pathname ===
                      item.path
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-400"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}

              {!user ? (
                <Link href="/login">
                  <button
                    className="
                      mt-2
                      w-full
                      py-3
                      rounded-lg
                      bg-cyan-400
                      text-black
                      font-semibold
                      text-[16px]
                    "
                  >
                    Login
                  </button>
                </Link>
              ) : (
                <>
                  {/* MOBILE USER */}
                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-3
                      border-t
                      border-white/10
                      pt-5
                    "
                  >
                    {isValidImage ? (
                      <Image
                        src={user.image}
                        alt="user"
                        width={50}
                        height={50}
                        unoptimized
                        className="
                          rounded-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          w-[50px]
                          h-[50px]
                          rounded-full
                          bg-cyan-400
                          text-black
                          font-black
                          flex
                          items-center
                          justify-center
                          text-xl
                        "
                      >
                        {initial}
                      </div>
                    )}

                    <div>
                      <h3 className="text-white font-bold">
                        {user?.name}
                      </h3>

                      <p className="text-gray-400 text-sm break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="
                      w-full
                      py-3
                      rounded-xl
                      bg-cyan-400
                      text-black
                      font-bold
                    "
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}