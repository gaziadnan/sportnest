"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import StatCard from "./StatCard";

import heroBg from "@/assets/hero-bg.png";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function HeroSection() {
  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const handleStartBooking =
    () => {
      if (user) {
        router.push(
          "/my-bookings"
        );
      } else {
        router.push("/login");
      }
    };

  return (
    <section
      className="
        relative
        w-full
        min-h-screen
        overflow-hidden
      "
    >
      {/* BACKGROUND IMAGE */}
      <Image
        src={heroBg}
        alt="Hero Background"
        fill
        priority
        className="
          object-cover
          object-center
        "
      />

      {/* LIGHT OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-[#020817]/60
        "
      />

      {/* GRADIENT */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#020817]/90
          via-[#020817]/55
          to-[#020817]/30
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          max-w-[1400px]
          mx-auto
          min-h-screen
          px-4
          pt-28
          pb-16
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-16
        "
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="
            w-full
            max-w-[650px]
          "
        >
          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-[1.1]
              text-white
            "
          >
            Elevate Your

            <span
              className="
                block
                text-cyan-400
              "
            >
              Sports Experience
            </span>
          </h1>

          <p
            className="
              mt-8
              text-[17px]
              md:text-lg
              text-gray-300
              leading-[1.9]
              max-w-[620px]
            "
          >
            Reserve world-class sports
            arenas, football turfs,
            badminton courts, and
            premium fitness spaces —
            all from one modern booking
            platform built for athletes.
          </p>

          {/* BUTTONS */}
          <div
            className="
              mt-10
              flex
              items-center
              gap-5
              flex-wrap
            "
          >
            <button
              onClick={() =>
                router.push(
                  "/facilities"
                )
              }
              className="
                px-8
                h-[56px]
                rounded-2xl
                bg-cyan-400
                text-black
                font-bold
                text-[16px]
                transition-all
                duration-300
                hover:bg-cyan-300
                hover:scale-105
                hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]
              "
            >
              Explore Facilities
            </button>

            <button
              onClick={
                handleStartBooking
              }
              className="
                px-8
                h-[56px]
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-lg
                text-white
                font-semibold
                text-[16px]
                transition-all
                duration-300
                hover:bg-white/10
                hover:scale-105
              "
            >
              Start Booking
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="
            w-full
            max-w-[520px]
            grid
            grid-cols-2
            gap-5
          "
        >
          <div className="mt-10">
            <StatCard
              number={150}
              suffix="+"
              title="Premium Facilities"
            />
          </div>

          <StatCard
            number={10}
            suffix="k+"
            title="Monthly Bookings"
          />

          <StatCard
            number={5}
            suffix="k+"
            title="Active Players"
          />

          <div className="mt-10">
            <StatCard
              number={99}
              suffix="%"
              title="Customer Satisfaction"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}