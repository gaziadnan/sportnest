"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaGoogle,
  FaImage,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [passwordError, setPasswordError] =
    useState("");

  // PASSWORD VALIDATION
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain one lowercase letter";
    }

    return "";
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      setPasswordError(
        validatePassword(value)
      );
    }
  };

  // REGISTER
  // REGISTER
const handleRegister = async (e) => {
  e.preventDefault();

  const error = validatePassword(
    formData.password
  );

  if (error) {
    setPasswordError(error);

    toast.error(error);

    return;
  }

  try {
    setLoading(true);

    // ACCOUNT CREATE
    const res = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.image,
    });

    // ERROR HANDLE
    if (res.error) {
      toast.error(
        res.error.message ||
          "Registration failed"
      );

      return;
    }

    // AUTO LOGIN REMOVE
    await authClient.signOut();

    toast.success(
      "Registration successful! Please login."
    );

    // LOGIN PAGE REDIRECT
    router.push("/login");

  } catch (error) {
    toast.error(
      "Something went wrong. Try again."
    );
  } finally {
    setLoading(false);
  }
};


  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google login failed");
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
        py-8
      "
    >
      <div
        className="
          w-full
          max-w-[1180px]
          rounded-[28px]
          overflow-hidden
          border
          border-cyan-400/10
          bg-gradient-to-br
          from-[#071120]
          via-[#081424]
          to-[#020817]
          shadow-[0_0_50px_rgba(0,0,0,0.45)]
          grid
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            relative
            hidden
            lg:flex
            items-center
            px-12
            py-10
            overflow-hidden
          "
        >
          <Image
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1400&auto=format&fit=crop"
            alt="Sport"
            fill
            className="object-cover"
          />

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#020817]/95
              via-[#020817]/75
              to-transparent
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              z-10
              max-w-[420px]
            "
          >
            <Link href="/">
              <h1
                className="
                  text-2xl
                  font-black
                  cursor-pointer
                "
              >
                <span className="text-white">
                  Sport
                </span>

                <span className="text-cyan-400">
                  Nest
                </span>
              </h1>
            </Link>

            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                mt-14
                text-4xl
                leading-[1.15]
                font-black
                text-white
              "
            >
              Join The
              <br />

              <span className="text-cyan-400">
                Ultimate Sports
              </span>

              <br />
              Community.
            </motion.h2>

            <p
              className="
                mt-6
                text-gray-300
                text-sm
                leading-7
              "
            >
              Book premium sports facilities,
              manage reservations, and enjoy
              a seamless next-generation
              sports booking experience.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex
            items-center
            justify-center
            px-5
            md:px-8
            py-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              w-full
              max-w-[430px]
              rounded-[24px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-6
              md:p-7
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
                Create Account
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-gray-400
                  leading-6
                "
              >
                Sign up and start booking
                your favorite sports
                facilities.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleRegister}
              className="mt-7 space-y-4"
            >
              {/* NAME */}
              <div>
                <label
                  className="
                    text-xs
                    text-gray-300
                  "
                >
                  Full Name
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0B1727]
                    px-4
                    h-[50px]
                    focus-within:border-cyan-400/50
                  "
                >
                  <FaUser className="text-cyan-400 text-sm" />

                  <input
                    type="text"
                    name="name"
                    required
                    onChange={handleChange}
                    placeholder="John Doe"
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

              {/* EMAIL */}
              <div>
                <label
                  className="
                    text-xs
                    text-gray-300
                  "
                >
                  Email Address
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0B1727]
                    px-4
                    h-[50px]
                    focus-within:border-cyan-400/50
                  "
                >
                  <FaEnvelope className="text-cyan-400 text-sm" />

                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
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

              {/* PHOTO URL */}
              <div>
                <label
                  className="
                    text-xs
                    text-gray-300
                  "
                >
                  Photo URL
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0B1727]
                    px-4
                    h-[50px]
                    focus-within:border-cyan-400/50
                  "
                >
                  <FaImage className="text-cyan-400 text-sm" />

                  <input
                    type="text"
                    name="image"
                    onChange={handleChange}
                    placeholder="https://your-image-url.com"
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
                <label
                  className="
                    text-xs
                    text-gray-300
                  "
                >
                  Password
                </label>

                <div
                  className={`
                    mt-2
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-4
                    h-[50px]
                    bg-[#0B1727]
                    transition-all
                    duration-300

                    ${
                      passwordError
                        ? "border-red-500"
                        : "border-white/10"
                    }
                  `}
                >
                  <FaLock className="text-cyan-400 text-sm" />

                  <input
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
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

                {/* ERROR MESSAGE */}
                {passwordError && (
                  <p
                    className="
                      mt-2
                      text-xs
                      text-red-400
                    "
                  >
                    {passwordError}
                  </p>
                )}

                {/* PASSWORD RULES */}
                <div
                  className="
                    mt-3
                    space-y-1
                    text-xs
                  "
                >
                  <p
                    className={`
                      ${
                        formData.password.length >= 6
                          ? "text-green-400"
                          : "text-gray-500"
                      }
                    `}
                  >
                    • At least 6 characters
                  </p>

                  <p
                    className={`
                      ${
                        /[A-Z]/.test(
                          formData.password
                        )
                          ? "text-green-400"
                          : "text-gray-500"
                      }
                    `}
                  >
                    • One uppercase letter
                  </p>

                  <p
                    className={`
                      ${
                        /[a-z]/.test(
                          formData.password
                        )
                          ? "text-green-400"
                          : "text-gray-500"
                      }
                    `}
                  >
                    • One lowercase letter
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-[50px]
                  rounded-xl
                  bg-cyan-400
                  text-black
                  font-bold
                  text-sm
                  transition-all
                  duration-300
                  hover:bg-cyan-300
                  shadow-[0_0_25px_rgba(34,211,238,0.35)]
                "
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </motion.button>

              {/* DIVIDER */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  py-1
                "
              >
                <div className="flex-1 h-[1px] bg-white/10" />

                <span className="text-gray-500 text-xs">
                  OR
                </span>

                <div className="flex-1 h-[1px] bg-white/10" />
              </div>

              {/* GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="
                  w-full
                  h-[50px]
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-white
                  text-sm
                  font-semibold
                "
              >
                <FaGoogle className="text-cyan-400 text-sm" />

                Continue with Google
              </button>

              {/* LOGIN LINK */}
              <p
                className="
                  text-center
                  text-gray-400
                  text-sm
                  pt-1
                "
              >
                Already have an account?{" "}

                <Link
                  href="/login"
                  className="
                    text-cyan-400
                    font-semibold
                    hover:text-cyan-300
                    transition-all
                  "
                >
                  Login
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}