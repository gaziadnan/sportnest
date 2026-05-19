"use client";

import CountUp from "react-countup";

import { motion } from "framer-motion";

export default function StatCard({
  number,
  suffix,
  title,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="
        w-full
        min-h-[190px]
        rounded-[28px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-md
        flex
        flex-col
        items-center
        justify-center
        text-center
        p-6
        shadow-[0_0_40px_rgba(0,0,0,0.25)]
      "
    >
      <h2
        className="
          text-4xl
          md:text-5xl
          font-black
          text-cyan-400
        "
      >
        <CountUp
          end={number}
          duration={3}
        />

        {suffix}
      </h2>

      <p
        className="
          mt-3
          text-gray-300
          text-[13px]
          md:text-[15px]
          font-semibold
          uppercase
          tracking-[3px]
        "
      >
        {title}
      </p>
    </motion.div>
  );
}