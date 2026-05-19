"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function FacilitiesPage() {

  const {
    data: session,
  } = authClient.useSession();

  const user = session?.user;

  const [facilities, setFacilities] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {

    fetch(
      `http://localhost:8000/facilities?search=${search}&type=${type}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {

        setFacilities(
          data.facilities
        );

        setTotalPages(
          Math.ceil(
            data.total / 9
          )
        );
      });

  }, [search, type, page]);

  const handleBooking =
    async (facility) => {

      if (!user) {
        toast.error(
          "Please login first"
        );

        return;
      }

      const bookingData = {
        facilityId: facility._id,
        facilityName:
          facility.name,
        facilityImage:
          facility.image,
        price:
          facility.price_per_hour,
        userEmail: user.email,
        userName: user.name,
        bookingDate:
          new Date(),
      };

      const res = await fetch(
        "http://localhost:8000/bookings",
        {
          method: "POST",

          headers: {
            "content-type":
              "application/json",
          },

          body: JSON.stringify(
            bookingData
          ),
        }
      );

      const data =
        await res.json();

      if (data.insertedId) {
        toast.success(
          "Booking Successful!"
        );
      }
    };

  return (
    <section
      className="
        min-h-screen
        px-4
        py-20
        bg-gradient-to-b
        from-[#020817]
        via-[#071120]
        to-[#020817]
      "
    >
      <div
        className="
          max-w-[1400px]
          mx-auto
        "
      >
        {/* SEARCH */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-5
            mb-10
          "
        >
          <input
            type="text"
            placeholder="Search facility..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              flex-1
              h-14
              rounded-2xl
              bg-[#0B1727]
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value
              )
            }
            className="
              w-full
              md:w-[240px]
              h-14
              rounded-2xl
              bg-[#0B1727]
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          >
            <option value="">
              All Sports
            </option>

            <option value="Football">
              Football
            </option>

            <option value="Basketball">
              Basketball
            </option>

            <option value="Swimming">
              Swimming
            </option>

            <option value="Tennis">
              Tennis
            </option>
          </select>
        </div>

        {/* CARDS */}
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {facilities.map(
            (facility) => (
              <motion.div
                key={facility._id}
                whileHover={{
                  y: -8,
                }}
                className="
                  rounded-[30px]
                  overflow-hidden
                  border
                  border-white/10
                  bg-[#0B1727]
                "
              >
                <div
                  className="
                    relative
                    h-[260px]
                  "
                >
                  <Image
                    src={
                      facility.image
                    }
                    alt={
                      facility.name
                    }
                    fill
                    className="
                      object-cover
                    "
                  />
                </div>

                <div className="p-6">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <h2
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      {
                        facility.name
                      }
                    </h2>

                    <span
                      className="
                        text-cyan-400
                        font-bold
                      "
                    >
                      $
                      {
                        facility.price_per_hour
                      }
                      /hr
                    </span>
                  </div>

                  <p
                    className="
                      mt-4
                      text-gray-400
                      leading-[1.8]
                    "
                  >
                    {
                      facility.description
                    }
                  </p>

                  <button
                    onClick={() =>
                      handleBooking(
                        facility
                      )
                    }
                    className="
                      mt-6
                      w-full
                      h-14
                      rounded-2xl
                      bg-cyan-400
                      text-black
                      font-bold
                      hover:bg-cyan-300
                      transition-all
                    "
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* PAGINATION */}
        <div
          className="
            flex
            justify-center
            gap-4
            mt-14
          "
        >
          {[
            ...Array(totalPages),
          ].map((_, index) => (
            <button
              key={index}
              onClick={() =>
                setPage(
                  index + 1
                )
              }
              className={`
                w-12
                h-12
                rounded-full
                font-bold
                transition-all
                ${
                  page ===
                  index + 1
                    ? "bg-cyan-400 text-black"
                    : "bg-[#0B1727] text-white border border-white/10"
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}