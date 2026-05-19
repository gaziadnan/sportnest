"use client";

import { useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import { toast } from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res =
        await authClient.signIn.email({
          email: formData.email,
          password:
            formData.password,
        });

      if (res?.error) {
        toast.error(
          res.error.message ||
            "Invalid email or password"
        );

        setLoading(false);

        return;
      }

      toast.success(
        "Login successful!"
      );

      router.push("/");

      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin =
    async () => {
      try {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
      } catch (error) {
        toast.error(
          "Google login failed"
        );
      }
    };

  return (
    <section
      className="
        min-h-screen
        bg-[#020817]
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >
      <div
        className="
          w-full
          max-w-[1400px]
          rounded-[40px]
          overflow-hidden
          border
          border-white/10
          bg-[#071120]
          shadow-[0_0_60px_rgba(0,0,0,0.35)]
          grid
          grid-cols-1
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            relative
            hidden
            lg:block
            min-h-[900px]
          "
        >
          {/* IMAGE */}
          <Image
            src="/images/login-sports.jpg"
            alt="login"
            fill
            priority
            className="object-cover"
          />

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#020817]/90
              via-[#020817]/50
              to-transparent
            "
          />

          {/* CONTENT */}
          <div
            className="
              absolute
              z-10
              inset-0
              flex
              flex-col
              justify-between
              p-12
            "
          >
            {/* LOGO */}
            <Link href="/">
              <h2
                className="
                  text-4xl
                  font-black
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

            {/* TEXT */}
            <div>
              <h1
                className="
                  text-7xl
                  font-black
                  leading-[1.1]
                  text-white
                "
              >
                Elevate Your

                <span className="text-cyan-400">
                  {" "}
                  Performance.
                </span>
              </h1>

              <p
                className="
                  mt-8
                  max-w-[550px]
                  text-xl
                  leading-[1.9]
                  text-gray-300
                "
              >
                The premium platform
                for booking
                high-performance
                sports facilities and
                training grounds.
              </p>
            </div>

            {/* BOTTOM */}
            <div
              className="
                flex
                items-center
                gap-5
              "
            >
              <div className="flex -space-x-3">
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    border-2
                    border-[#071120]
                    bg-cyan-400
                  "
                />

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    border-2
                    border-[#071120]
                    bg-cyan-300
                  "
                />

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    border-2
                    border-[#071120]
                    bg-cyan-200
                  "
                />
              </div>

              <p className="text-gray-300">
                Join 5,000+ elite
                athletes today
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            relative
            flex
            items-center
            justify-center
            px-6
            md:px-12
            py-16
            bg-gradient-to-b
            from-[#071120]
            to-[#020817]
          "
        >
          {/* GLOW */}
          <div
            className="
              absolute
              w-[350px]
              h-[350px]
              rounded-full
              bg-cyan-400/10
              blur-[120px]
            "
          />

          {/* LOGIN CARD */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              relative
              z-10
              w-full
              max-w-[520px]
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8
              md:p-10
              shadow-[0_0_50px_rgba(0,0,0,0.25)]
            "
          >
            {/* TITLE */}
            <div>
              <h2
                className="
                  text-5xl
                  font-black
                  text-white
                "
              >
                Welcome Back
              </h2>

              <p
                className="
                  mt-4
                  text-gray-400
                  leading-[1.8]
                "
              >
                Enter your credentials
                to access your sports
                dashboard.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="mt-10"
            >
              {/* EMAIL */}
              <div className="mb-6">
                <label
                  className="
                    block
                    mb-3
                    text-white
                    font-semibold
                  "
                >
                  Email Address
                </label>

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0B1629]
                    px-5
                    h-[65px]
                  "
                >
                  <FaEnvelope className="text-cyan-400 text-lg" />

                  <input
                    type="email"
                    name="email"
                    required
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="name@sportnest.com"
                    className="
                      w-full
                      bg-transparent
                      outline-none
                      text-white
                      placeholder:text-gray-500
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  <label
                    className="
                      text-white
                      font-semibold
                    "
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="
                      text-cyan-400
                      text-sm
                      hover:underline
                    "
                  >
                    Forgot Password?
                  </button>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0B1629]
                    px-5
                    h-[65px]
                  "
                >
                  <FaLock className="text-cyan-400 text-lg" />

                  <input
                    type="password"
                    name="password"
                    required
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="••••••••"
                    className="
                      w-full
                      bg-transparent
                      outline-none
                      text-white
                      placeholder:text-gray-500
                    "
                  />
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                disabled={loading}
                type="submit"
                className="
                  mt-8
                  w-full
                  h-[65px]
                  rounded-2xl
                  bg-cyan-400
                  text-black
                  text-lg
                  font-bold
                  transition-all
                  duration-300
                  hover:bg-cyan-300
                  shadow-[0_0_30px_rgba(34,211,238,0.35)]
                  disabled:opacity-60
                "
              >
                {loading
                  ? "Logging in..."
                  : "Login to SportNest →"}
              </motion.button>
            </form>

            {/* DIVIDER */}
            <div
              className="
                relative
                my-8
                flex
                items-center
                justify-center
              "
            >
              <div
                className="
                  absolute
                  w-full
                  h-[1px]
                  bg-white/10
                "
              />

              <span
                className="
                  relative
                  px-4
                  bg-[#091323]
                  text-gray-400
                  text-sm
                "
              >
                OR
              </span>
            </div>

            {/* GOOGLE BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={
                handleGoogleLogin
              }
              className="
                w-full
                h-[65px]
                rounded-2xl
                border
                border-white/10
                bg-white/5
                flex
                items-center
                justify-center
                gap-4
                text-white
                font-semibold
                transition-all
                duration-300
                hover:border-cyan-400/30
                hover:bg-white/10
              "
            >
              <FcGoogle className="text-2xl" />

              Continue with Google
            </motion.button>

            {/* REGISTER */}
            <p
              className="
                mt-8
                text-center
                text-gray-400
              "
            >
              Don&apos;t have an
              account?

              <Link
                href="/register"
                className="
                  ml-2
                  text-cyan-400
                  font-semibold
                  hover:underline
                "
              >
                Sign up for free
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}