"use client";

import {
  FaFutbol,
  FaShieldAlt,
  FaClock,
  FaBolt,
  FaBasketballBall,
} from "react-icons/fa";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
} from "swiper/modules";

import "swiper/css";

const features = [
  {
    title:
      "Easy Booking",

    description:
      "Book your favorite sports facility instantly with a smooth process.",

    icon: <FaBolt />,
  },

  {
    title:
      "Secure Payment",

    description:
      "Safe and trusted payment system for all bookings and reservations.",

    icon: <FaShieldAlt />,
  },

  {
    title:
      "24/7 Availability",

    description:
      "Find available slots anytime and manage bookings easily.",

    icon: <FaClock />,
  },

  {
    title:
      "Premium Facilities",

    description:
      "Explore top-quality sports venues with modern environments.",

    icon: <FaFutbol />,
  },

  {
    title:
      "Multiple Sports",

    description:
      "Enjoy football, cricket, basketball, swimming and more in one platform.",

    icon: (
      <FaBasketballBall />
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="
        py-10
        pt-5
        pb-15

      px-4
        bg-gradient-to-b
        from-[#020817]
        via-[#071120]
        to-[#020817]
        overflow-hidden
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-10">
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
              mb-2
            "
          >
            WHY CHOOSE US
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
            Why Players 
            
            <span className="text-cyan-400">
              {" "}
              Love Us
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
            Experience smooth
            booking, premium
            facilities, and a
            trusted sports platform
            built for everyone.
          </p>
        </div>

        {/* SLIDER */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction:
              false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },

            640: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {features.map(
            (
              feature,
              index
            ) => (
              <SwiperSlide
                key={index}
              >
                <div
                  className="
                    group
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-8
                    hover:-translate-y-2
                    transition-all
                    duration-500
                    text-center
                    relative
                    overflow-hidden
                    h-full
                  "
                >
                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-cyan-500/0
                      group-hover:bg-cyan-500/5
                      transition-all
                      duration-500
                    "
                  />

                  {/* ICON */}
                  <div
                    className="
                      relative
                      z-10
                      w-16
                      h-16
                      rounded-2xl
                      bg-cyan-500/10
                      border
                      border-cyan-500/20
                      mx-auto
                      flex
                      items-center
                      justify-center
                      text-cyan-400
                      text-2xl
                      group-hover:scale-110
                      transition-all
                      duration-500
                    "
                  >
                    {feature.icon}
                  </div>

                  {/* CONTENT */}
                  <h3
                    className="
                      relative
                      z-10
                      text-xl
                      font-bold
                      text-white
                      mt-6
                    "
                  >
                    {
                      feature.title
                    }
                  </h3>

                  <p
                    className="
                      relative
                      z-10
                      text-gray-400
                      text-sm
                      leading-7
                      mt-4
                    "
                  >
                    {
                      feature.description
                    }
                  </p>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
}