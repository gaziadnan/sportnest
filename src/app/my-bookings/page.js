"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import {
  FaCalendar,
  FaLocationDot,
} from "react-icons/fa6";

import { MdAccessTimeFilled } from "react-icons/md";

export default function MyBookingsPage() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  /* FETCH BOOKINGS */
  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `http://localhost:8000/bookings?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user]);

  /* CANCEL BOOKING */
  const handleCancelBooking =
    async (id) => {
      const confirmDelete =
        confirm(
          "Are you sure you want to cancel this booking?"
        );

      if (!confirmDelete)
        return;

      try {
        const res = await fetch(
          `http://localhost:8000/bookings/${id}`,
          {
            method: "DELETE",
          }
        );

        const data =
          await res.json();

        if (data.deletedCount > 0) {
          toast.success(
            "Booking cancelled"
          );

          const remaining =
            bookings.filter(
              (booking) =>
                booking._id !== id
            );

          setBookings(
            remaining
          );
        }
      } catch (error) {
        toast.error(
          "Failed to cancel booking"
        );
      }
    };

  /* LOADING */
  if (loading) {
    return (
      <section
        className="
          min-h-screen
          flex
          justify-center
          items-center
          bg-[#020817]
          text-white
        "
      >
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </section>
    );
  }

  return (
    <section
      className="
        min-h-screen
        bg-gradient-to-b
        from-[#020817]
        via-[#071120]
        to-[#020817]
        px-4
        py-20
      "
    >
      <div className="max-w-[1350px] mx-auto">
        {/* HEADING */}
        <div className="text-center mb-14">
          <h1
            className="
              text-3xl
              md:text-5xl
              font-black
              text-white
            "
          >
            My{" "}
            <span className="text-cyan-400">
              Bookings
            </span>
          </h1>

          <p
            className="
              mt-4
              text-gray-400
              max-w-[700px]
              mx-auto
              leading-[1.9]
            "
          >
            View and manage all your
            confirmed sports facility
            bookings.
          </p>
        </div>

        {/* EMPTY */}
        {bookings.length === 0 && (
          <div
            className="
              text-center
              py-24
              border
              border-white/10
              rounded-[30px]
              bg-white/5
              backdrop-blur-xl
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              No Bookings Found
            </h2>

            <p className="text-gray-400 mt-3">
              Book your favourite
              facility first.
            </p>
          </div>
        )}

        {/* BOOKINGS */}
        <div className="space-y-7">
          {bookings.map(
            (booking) => {
              const bookingDate =
                booking.createdAt
                  ? new Date(
                      booking.createdAt
                    )
                  : new Date();

              const day =
                bookingDate.getDate();

              const monthYear =
                bookingDate.toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    year: "numeric",
                  }
                );

              const fullDate =
                bookingDate.toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                );

              const fullTime =
                bookingDate.toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute:
                      "2-digit",
                  }
                );

              return (
                <div
                  key={booking._id}
                  className="
                    group
                    flex
                    flex-col
                    xl:flex-row
                    items-center
                    gap-6
                    rounded-[30px]
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-6
                    hover:border-cyan-400/30
                    transition-all
                    duration-300
                    shadow-[0_0_40px_rgba(0,0,0,0.25)]
                  "
                >
                  {/* DATE BOX */}
                  <div
                    className="
                      w-[120px]
                      min-w-[120px]
                      h-[160px]
                      rounded-[24px]
                      border
                      border-cyan-400/20
                      bg-cyan-500/10
                      flex
                      flex-col
                      justify-center
                      items-center
                    "
                  >
                    <h2
                      className="
                        text-5xl
                        font-black
                        text-white
                        leading-none
                      "
                    >
                      {day}
                    </h2>

                    <p
                      className="
                        text-cyan-300
                        mt-2
                        text-lg
                        font-medium
                      "
                    >
                      {monthYear}
                    </p>

                    <p
                      className="
                        text-gray-400
                        text-sm
                        mt-2
                      "
                    >
                      {fullTime}
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div
                    className="
                      relative
                      w-full
                      xl:w-[320px]
                      h-[210px]
                      overflow-hidden
                      rounded-[24px]
                    "
                  >
                    <Image
                      src={
                        booking.facilityImage
                      }
                      alt={
                        booking.facilityName
                      }
                      fill
                      sizes="320px"
                      className="
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                    />

                    <div
                      className="
                        absolute
                        top-4
                        left-4
                        bg-cyan-500
                        text-white
                        text-xs
                        font-bold
                        px-4
                        py-2
                        rounded-full
                      "
                    >
                      {
                        booking.facilityType
                      }
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 w-full">
                    <h2
                      className="
                        text-2xl
                        md:text-3xl
                        font-black
                        text-white
                        mb-5
                      "
                    >
                      {
                        booking.facilityName
                      }
                    </h2>

                    {/* META */}
                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-6
                        text-gray-300
                        text-[15px]
                      "
                    >
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-cyan-400 text-sm" />

                        <span>
                          {fullDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MdAccessTimeFilled className="text-cyan-400 text-sm" />

                        <span>
                          {fullTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaLocationDot className="text-cyan-400 text-sm" />

                        <span>
                          {
                            booking.location
                          }
                        </span>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <p
                      className="
                        mt-6
                        text-gray-400
                        leading-[2]
                        text-[14px]
                        max-w-[760px]
                      "
                    >
                      Your booking has
                      been confirmed
                      successfully.
                      Enjoy premium
                      sports facilities
                      and modern
                      environment.
                    </p>

                    {/* PRICE */}
                    <div className="mt-7">
                      <h3
                        className="
                          text-2xl
                          font-black
                          text-white
                        "
                      >
                        ৳
                        {booking.price}
                      </h3>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div>
                    <button
                      onClick={() =>
                        handleCancelBooking(
                          booking._id
                        )
                      }
                      className="
                        h-[58px]
                        px-10
                        rounded-full
                        bg-red-500
                        text-white
                        font-bold
                        text-lg
                        hover:bg-red-600
                        transition-all
                        duration-300
                        shadow-[0_0_30px_rgba(239,68,68,0.35)]
                        hover:scale-105
                      "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}