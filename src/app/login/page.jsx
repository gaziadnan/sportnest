"use client";

import { useState } from "react";

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
        py-6
        mt-17
      "
    >
      <div
        className="
          w-full
          max-w-[1150px]
          rounded-[28px]
          overflow-hidden
          border
          border-white/10
          bg-[#071120]
          shadow-[0_0_40px_rgba(0,0,0,0.35)]
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
            min-h-[700px]
          "
        >
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
              p-8
            "
          >
            {/* LOGO */}
            <Link href="/">
              <h2
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                
              </h2>
            </Link>

            {/* TEXT */}
            <div>
              <h1
                className="
                  text-5xl
                  font-black
                  leading-[1.15]
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
                  mt-5
                  max-w-[420px]
                  text-sm
                  leading-7
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
                gap-4
              "
            >
              <div className="flex -space-x-2">
                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    border-2
                    border-[#071120]
                    bg-cyan-400
                  "
                />

                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    border-2
                    border-[#071120]
                    bg-cyan-300
                  "
                />

                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    border-2
                    border-[#071120]
                    bg-cyan-200
                  "
                />
              </div>

              <p className="text-sm text-gray-300">
                Join 5,000+ athletes
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
            px-5
            md:px-8
            py-10
            bg-gradient-to-b
            from-[#071120]
            to-[#020817]
          "
        >
          {/* GLOW */}
          <div
            className="
              absolute
              w-[250px]
              h-[250px]
              rounded-full
              bg-cyan-400/10
              blur-[100px]
            "
          />

          {/* LOGIN CARD */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              relative
              z-10
              w-full
              max-w-[430px]
              rounded-[24px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-6
              md:p-7
              shadow-[0_0_40px_rgba(0,0,0,0.25)]
            "
          >
            {/* TITLE */}
            <div>
              <h2
                className="
                  text-3xl
                  font-black
                  text-white
                "
              >
                Welcome Back
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-gray-400
                  leading-6
                "
              >
                Login to access your
                sports dashboard.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="mt-7"
            >
              {/* EMAIL */}
              <div className="mb-4">
                <label
                  className="
                    block
                    mb-2
                    text-sm
                    text-white
                    font-medium
                  "
                >
                  Email Address
                </label>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0B1629]
                    px-4
                    h-[52px]
                  "
                >
                  <FaEnvelope className="text-cyan-400 text-sm" />

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
                      text-sm
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
                    mb-2
                  "
                >
                  <label
                    className="
                      text-sm
                      text-white
                      font-medium
                    "
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="
                      text-cyan-400
                      text-xs
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
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0B1629]
                    px-4
                    h-[52px]
                  "
                >
                  <FaLock className="text-cyan-400 text-sm" />

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
                      text-sm
                      text-white
                      placeholder:text-gray-500
                    "
                  />
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                disabled={loading}
                type="submit"
                className="
                  mt-6
                  w-full
                  h-[52px]
                  rounded-xl
                  bg-cyan-400
                  text-black
                  text-sm
                  font-bold
                  transition-all
                  duration-300
                  hover:bg-cyan-300
                  shadow-[0_0_20px_rgba(34,211,238,0.35)]
                  disabled:opacity-60
                "
              >
                {loading
                  ? "Logging in..."
                  : "Login to SportNest"}
              </motion.button>
            </form>

            {/* DIVIDER */}
            <div
              className="
                relative
                my-6
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
                  px-3
                  bg-[#091323]
                  text-gray-400
                  text-xs
                "
              >
                OR
              </span>
            </div>

            {/* GOOGLE BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={
                handleGoogleLogin
              }
              className="
                w-full
                h-[52px]
                rounded-xl
                border
                border-white/10
                bg-white/5
                flex
                items-center
                justify-center
                gap-3
                text-white
                text-sm
                font-medium
                transition-all
                duration-300
                hover:border-cyan-400/30
                hover:bg-white/10
              "
            >
              <FcGoogle className="text-xl" />

              Continue with Google
            </motion.button>

            {/* REGISTER */}
            <p
              className="
                mt-6
                text-center
                text-sm
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
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}