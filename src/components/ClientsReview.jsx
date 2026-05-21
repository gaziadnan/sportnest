"use client";

import Image from "next/image";

import {
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

import {
  motion,
} from "framer-motion";

const reviews = [
  {
    name: "David Rahman",

    role:
      "Football Player",

    review:
      "Booking sports venues has never been this easy. The platform is smooth, fast, and the facilities are premium.",

    image:
      "https://i.pravatar.cc/100?img=12",
  },

  {
    name: "Sarah Khan",

    role:
      "Tennis Player",

    review:
      "I love how simple and professional the booking experience feels. Everything works perfectly.",

    image:
      "https://i.pravatar.cc/100?img=32",
  },

  {
    name: "Alex Roy",

    role:
      "Cricket Captain",

    review:
      "The facilities are modern and the slot management system is incredibly smooth and reliable.",

    image:
      "https://i.pravatar.cc/100?img=15",
  },

  {
    name: "Mahir Ahmed",

    role:
      "Basketball Player",

    review:
      "One of the best sports booking platforms I have ever used. Clean UI and amazing support team.",

    image:
      "https://i.pravatar.cc/100?img=25",
  },
];

export default function ReviewSection() {
  return (
    <section
      className="
        pt-5
        pb-24
        px-4
        bg-gradient-to-b
        from-[#020817]
        via-[#071120]
        to-[#020817]
        overflow-hidden
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* TOP */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-16"
        >
          <span
            className="
              inline-block
              px-4
              py-1.5
              rounded-full
              bg-cyan-500/10
              text-cyan-400
              text-sm
              font-semibold
              border
              border-cyan-500/20
            "
          >
            PLAYER REVIEWS
          </span>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              text-white
              mt-5
            "
          >
            What Players <span className="text-cyan-400">
              {" "}
              Say About Us
            </span>
          </h2>

          <p
            className="
              text-gray-400
              max-w-2xl
              mx-auto
              mt-5
              leading-8
            "
          >
            Thousands of players
            trust our platform for
            fast booking and premium
            sports facilities.
          </p>
        </motion.div>

        {/* REVIEW GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {reviews.map(
            (
              review,
              index
            ) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.7,
                  delay:
                    index * 0.2,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -10,
                }}
                className={`
                  relative
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-7
                  overflow-hidden
                  transition-all
                  duration-500
                  ${
                    index % 2 === 0
                      ? "lg:mt-0"
                      : "lg:mt-12"
                  }
                `}
              >
                {/* GLOW */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-cyan-500/0
                    hover:bg-cyan-500/5
                    transition-all
                    duration-500
                  "
                />

                {/* QUOTE */}
                <div
                  className="
                    relative
                    z-10
                    w-14
                    h-14
                    rounded-2xl
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    flex
                    items-center
                    justify-center
                    text-cyan-400
                    text-xl
                  "
                >
                  <FaQuoteLeft />
                </div>

                {/* REVIEW */}
                <p
                  className="
                    relative
                    z-10
                    text-gray-300
                    text-sm
                    leading-8
                    mt-6
                  "
                >
                  "
                  {
                    review.review
                  }
                  "
                </p>

                {/* STARS */}
                <div
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-1
                    text-yellow-400
                    mt-6
                  "
                >
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                {/* USER */}
                <div
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-4
                    mt-7
                  "
                >
                  <Image
                    src={
                      review.image
                    }
                    alt={
                      review.name
                    }
                    width={55}
                    height={55}
                    className="
                      rounded-full
                      border-2
                      border-cyan-500
                    "
                  />

                  <div>
                    <h4
                      className="
                        text-white
                        font-bold
                      "
                    >
                      {
                        review.name
                      }
                    </h4>

                    <p
                      className="
                        text-gray-400
                        text-sm
                        mt-1
                      "
                    >
                      {
                        review.role
                      }
                    </p>
                  </div>
                </div>

                {/* BIG QUOTE */}
                <div
                  className="
                    absolute
                    bottom-0
                    right-4
                    text-[90px]
                    font-black
                    text-cyan-500/5
                    leading-none
                  "
                >
                  "
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}