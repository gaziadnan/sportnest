"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { FaBars, FaTimes } from "react-icons/fa";

import { motion } from "framer-motion";

import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  // TEMP USER
  const user = false;

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "All Facilities",
      path: "/facilities",
    },
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
      path: "/manage-facilities",
    },
  ];

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
                      pathname === item.path
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
                      pathname === item.path
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
            {!user && (
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
                      pathname === item.path
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-400"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}

              {!user && (
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
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}