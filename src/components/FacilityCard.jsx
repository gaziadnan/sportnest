"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { FaLocationDot } from "react-icons/fa6";

export default function FacilityCard({
  facility,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="
        group
        rounded-[28px]
        overflow-hidden
        border
        border-white/10
        bg-white/5
        backdrop-blur-md
        shadow-[0_0_35px_rgba(0,0,0,0.25)]
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          h-[240px]
          overflow-hidden
        "
      >
        <Image
          src={facility.image}
          alt={facility.name}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            to-transparent
          "
        />

        {/* TYPE */}
        <div
          className="
            absolute
            top-4
            left-4
            px-4
            py-2
            rounded-full
            bg-cyan-400
            text-black
            text-sm
            font-bold
          "
        >
          {facility.facility_type}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h2
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          {facility.name}
        </h2>

        {/* LOCATION */}
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            text-gray-400
          "
        >
          <FaLocationDot className="text-cyan-400" />

          <span>{facility.location}</span>
        </div>

        {/* DESCRIPTION */}
        <p
          className="
            mt-4
            text-gray-300
            leading-[1.8]
            text-sm
          "
        >
          {facility.description.slice(0, 95)}...
        </p>

        {/* PRICE */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p className="text-gray-400 text-sm">
              Price Per Hour
            </p>

            <h3
              className="
                text-cyan-400
                text-2xl
                font-black
              "
            >
              ৳ {facility.price_per_hour}
            </h3>
          </div>

          <button
            className="
              px-5
              h-[46px]
              rounded-xl
              bg-cyan-400
              text-black
              font-bold
              transition-all
              duration-300
              hover:bg-cyan-300
              hover:scale-105
            "
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}