"use client";

import { motion } from "framer-motion";

export default function FeatureOrbitCard({
  icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="
        w-full
        rounded-[28px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-md
        p-6
        text-center
        shadow-[0_0_30px_rgba(0,0,0,0.25)]
        transition-all
        duration-300
        hover:border-cyan-400/40
      "
    >
      <div
        className="
          w-16
          h-16
          mx-auto
          rounded-full
          bg-cyan-400/10
          border
          border-cyan-400/20
          flex
          items-center
          justify-center
          text-cyan-400
          text-3xl
        "
      >
        {icon}
      </div>

      <h3
        className="
          mt-5
          text-xl
          font-bold
          text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3
          text-gray-400
          leading-[1.8]
          text-sm
        "
      >
        {description}
      </p>
    </motion.div>
  );
}