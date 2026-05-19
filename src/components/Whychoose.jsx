"use client";

import {
  FaBolt,
  FaShieldAlt,
  FaFutbol,
  FaMedal,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function WhyChoose() {
  const features = [
    {
      icon: <FaBolt />,
      title: "Instant Booking",
      description:
        "Reserve your favorite sports facility within seconds using our smart booking system.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Experience",
      description:
        "Protected booking process with smooth and reliable reservation management.",
    },
    {
      icon: <FaFutbol />,
      title: "Multiple Sports",
      description:
        "Explore football, cricket, badminton, swimming, tennis and more premium facilities.",
    },
    {
      icon: <FaMedal />,
      title: "Premium Quality",
      description:
        "Top-rated sports environments designed for athletes and sports enthusiasts.",
    },
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        py-28
        px-4
        bg-gradient-to-b
        from-[#020817]
        via-[#071120]
        to-[#020817]
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[600px]
          h-[600px]
          rounded-full
          bg-cyan-400/10
          blur-[160px]
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
        {/* SECTION TITLE */}
        <div className="text-center">
          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              text-white
            "
          >
            Why Choose

            <span className="text-cyan-400">
              {" "}
              SportNest
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-[760px]
              mx-auto
              text-gray-400
              leading-[1.9]
            "
          >
            Experience a next-generation
            sports booking platform
            designed for speed,
            convenience, and premium
            performance.
          </p>
        </div>

        {/* MAIN SECTION */}
        <div
          className="
            relative
            mt-24
            flex
            items-center
            justify-center
            min-h-[780px]
          "
        >
          {/* ROTATING BORDER */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            className="
              absolute
              w-[380px]
              h-[380px]
              rounded-full
              border
              border-cyan-400/20
            "
          />

          {/* CENTER CIRCLE */}
          <div
            className="
              absolute
              w-[220px]
              h-[220px]
              rounded-full
              border
              border-cyan-400/20
              bg-white/5
              backdrop-blur-xl
              flex
              items-center
              justify-center
              shadow-[0_0_60px_rgba(34,211,238,0.15)]
            "
          >
            <div className="text-center">
              <h3
                className="
                  text-4xl
                  font-black
                  text-white
                "
              >
                SportNest
              </h3>

              <p
                className="
                  mt-3
                  text-gray-400
                  text-sm
                "
              >
                Premium Sports Booking
                Platform
              </p>
            </div>
          </div>

          {/* TOP */}
<OrbitCard
  className="
    -top-34
    left-1/2
    -translate-x-1/2
  "
  feature={features[0]}
/>

{/* RIGHT */}
<OrbitCard
  className="
    right-20
    top-1/2
    -translate-y-1/2
  "
  feature={features[1]}
/>

{/* BOTTOM */}
<OrbitCard
  className="
    -bottom-44
    left-1/2
    -translate-x-1/2
  "
  feature={features[2]}
/>

{/* LEFT */}
<OrbitCard
  className="
    left-20
    top-1/2
    -translate-y-1/2
  "
  feature={features[3]}
/>
        </div>
      </div>
    </section>
  );
}

/* CARD */

function OrbitCard({
  feature,
  className,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className={`
        absolute
        w-[280px]
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-7
        text-center
        shadow-[0_0_30px_rgba(0,0,0,0.25)]
        transition-all
        duration-300
        hover:border-cyan-400/30
        hover:bg-white/10
        ${className}
      `}
    >
      {/* ICON */}
      <div
        className="
          w-16
          h-16
          mx-auto
          rounded-full
          border
          border-cyan-400/20
          bg-cyan-400/10
          flex
          items-center
          justify-center
          text-cyan-400
          text-3xl
        "
      >
        {feature.icon}
      </div>

      {/* TITLE */}
      <h3
        className="
          mt-5
          text-2xl
          font-bold
          text-white
        "
      >
        {feature.title}
      </h3>

      {/* DESCRIPTION */}
      <p
        className="
          mt-4
          text-gray-400
          leading-[1.8]
          text-sm
        "
      >
        {feature.description}
      </p>
    </motion.div>
  );
}