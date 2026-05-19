"use client";

import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-white/10
        bg-gradient-to-b
        from-[#071120]
        to-[#020817]
        pt-20
        pb-8
        px-4
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[250px]
          bg-cyan-400/10
          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10
          max-w-[1400px]
          mx-auto
        "
      >
        {/* TOP */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-12
            pb-14
            border-b
            border-white/10
          "
        >
          {/* LOGO + ABOUT */}
          <div>
            <Link href="/">
              <h2
                className="
                  text-4xl
                  font-black
                  cursor-pointer
                  inline-block
                "
              >
                <span className="text-white">
                  Sport
                </span>

                <span className="text-cyan-400">
                  Nest
                </span>
              </h2>
            </Link>

            <p
              className="
                mt-5
                text-gray-400
                leading-[1.9]
              "
            >
              Book premium sports
              facilities anytime,
              anywhere. Experience
              seamless booking with
              SportNest.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3
              className="
                text-2xl
                font-bold
                text-white
                mb-6
              "
            >
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">
              {[
                "Home",
                "All Facilities",
                "My Bookings",
                "Add Facility",
              ].map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{
                    x: 5,
                  }}
                  href="#"
                  className="
                    text-gray-400
                    hover:text-cyan-400
                    transition-all
                    duration-300
                  "
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3
              className="
                text-2xl
                font-bold
                text-white
                mb-6
              "
            >
              Contact Info
            </h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <FaLocationDot
                  className="
                    text-cyan-400
                    text-xl
                    mt-1
                  "
                />

                <p className="text-gray-400 leading-[1.8]">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="flex gap-4">
                <FaPhone
                  className="
                    text-cyan-400
                    text-xl
                    mt-1
                  "
                />

                <p className="text-gray-400">
                  +880 1234-567890
                </p>
              </div>

              <div className="flex gap-4">
                <FaEnvelope
                  className="
                    text-cyan-400
                    text-xl
                    mt-1
                  "
                />

                <p className="text-gray-400">
                  support@sportnest.com
                </p>
              </div>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3
              className="
                text-2xl
                font-bold
                text-white
                mb-6
              "
            >
              Follow Us
            </h3>

            <div className="flex items-center gap-4">
              {[
                FaFacebookF,
                FaInstagram,
                FaLinkedinIn,
                FaXTwitter,
              ].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                  }}
                  href="#"
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    flex
                    items-center
                    justify-center
                    text-cyan-400
                    text-xl
                    transition-all
                    duration-300
                    hover:bg-cyan-400
                    hover:text-black
                    hover:border-cyan-400
                  "
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            pt-8
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >
          <p
            className="
              text-gray-500
              text-sm
              text-center
              md:text-left
            "
          >
            © 2026 SportNest. All
            Rights Reserved.
          </p>

          <div
            className="
              flex
              items-center
              gap-6
              text-sm
            "
          >
            <a
              href="#"
              className="
                text-gray-500
                hover:text-cyan-400
                transition-all
                duration-300
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
                text-gray-500
                hover:text-cyan-400
                transition-all
                duration-300
              "
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}