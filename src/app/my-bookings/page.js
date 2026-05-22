"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import {
  FaCalendar,
  FaLocationDot,
  FaXmark,
} from "react-icons/fa6";

import { MdAccessTimeFilled } from "react-icons/md";

export default function MyBookingsPage() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    deleteModal,
    setDeleteModal,
  ] = useState(false);

  const [
    selectedBooking,
    setSelectedBooking,
  ] = useState(null);

  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  /* FETCH BOOKINGS */
  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?email=${user.email}`
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

  /* OPEN DELETE MODAL */
  const openDeleteModal = (
    booking
  ) => {
    setSelectedBooking(
      booking
    );

    setDeleteModal(true);
  };

  /* CANCEL BOOKING */
  const handleCancelBooking =
    async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${selectedBooking._id}`,
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
                booking._id !==
                selectedBooking._id
            );

          setBookings(
            remaining
          );

          setDeleteModal(false);
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
        <h2 className="text-lg font-semibold">
          Loading...
        </h2>
      </section>
    );
  }

  return (
    <>
      <section
        className="
          min-h-screen
          bg-gradient-to-b
          from-[#020817]
          via-[#071120]
          to-[#020817]
          px-4
          py-14
          mt-10
        "
      >
        <div className="max-w-6xl mx-auto">
          {/* HEADING */}
          <div className="text-center mb-10">
            <h1
              className="
                text-2xl
                md:text-4xl
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
                mt-3
                text-sm
                text-gray-400
                max-w-xl
                mx-auto
                leading-7
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
                py-16
                border
                border-white/10
                rounded-[24px]
                bg-white/5
                backdrop-blur-xl
              "
            >
              <h2
                className="
                  text-xl
                  font-bold
                  text-white
                "
              >
                No Bookings Found
              </h2>

              <p className="text-gray-400 mt-2 text-sm">
                Book your favourite
                facility first.
              </p>
            </div>
          )}

          {/* BOOKINGS */}
          <div className="space-y-5">
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
                      lg:flex-row
                      items-center
                      gap-4
                      rounded-[24px]
                      border
                      border-white/10
                      bg-white/5
                      backdrop-blur-xl
                      p-4
                      hover:border-cyan-400/30
                      transition-all
                      duration-300
                    "
                  >
                    {/* DATE BOX */}
                    <div
                      className="
                        w-[85px]
                        min-w-[85px]
                        h-[115px]
                        rounded-[18px]
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
                          text-3xl
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
                          mt-1
                          text-xs
                          font-medium
                        "
                      >
                        {monthYear}
                      </p>

                      <p
                        className="
                          text-gray-400
                          text-[10px]
                          mt-1
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
                        lg:w-[230px]
                        h-[150px]
                        overflow-hidden
                        rounded-[18px]
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
                        sizes="230px"
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
                          top-3
                          left-3
                          bg-cyan-500
                          text-white
                          text-[10px]
                          font-semibold
                          px-3
                          py-1
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
                          text-xl
                          md:text-2xl
                          font-black
                          text-white
                          mb-3
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
                          gap-4
                          text-gray-300
                          text-xs
                        "
                      >
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-cyan-400 text-xs" />

                          <span>
                            {fullDate}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MdAccessTimeFilled className="text-cyan-400 text-xs" />

                          <span>
                            {fullTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FaLocationDot className="text-cyan-400 text-xs" />

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
                          mt-4
                          text-gray-400
                          leading-6
                          text-xs
                          max-w-[620px]
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
                      <div className="mt-4">
                        <h3
                          className="
                            text-xl
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
                          openDeleteModal(
                            booking
                          )
                        }
                        className="
                          h-[42px]
                          px-6
                          rounded-full
                          bg-red-500
                          text-white
                          font-semibold
                          text-sm
                          hover:bg-red-600
                          transition-all
                          duration-300
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

      {/* DELETE MODAL */}
      {deleteModal &&
        selectedBooking && (
          <div
            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              z-50
              flex
              items-center
              justify-center
              p-4
            "
          >
            <div
              className="
                w-full
                max-w-sm
                rounded-[24px]
                bg-[#0f172a]
                border
                border-white/10
                p-6
                relative
              "
            >
              {/* CLOSE */}
              <button
                onClick={() =>
                  setDeleteModal(
                    false
                  )
                }
                className="
                  absolute
                  top-4
                  right-4
                  text-gray-400
                  hover:text-white
                  transition-all
                "
              >
                <FaXmark />
              </button>

              {/* CONTENT */}
              <div className="text-center">
                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-red-500/15
                    flex
                    items-center
                    justify-center
                    mx-auto
                    mb-4
                  "
                >
                  <FaXmark className="text-red-400 text-xl" />
                </div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  Cancel Booking?
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-400
                    mt-3
                    leading-6
                  "
                >
                  Are you sure you want
                  to cancel this booking?
                  This action cannot be
                  undone.
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() =>
                      setDeleteModal(
                        false
                      )
                    }
                    className="
                      flex-1
                      h-[42px]
                      rounded-xl
                      border
                      border-white/10
                      text-sm
                      font-medium
                      text-white
                      hover:bg-white/5
                      transition-all
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={
                      handleCancelBooking
                    }
                    className="
                      flex-1
                      h-[42px]
                      rounded-xl
                      bg-red-500
                      hover:bg-red-600
                      transition-all
                      text-white
                      text-sm
                      font-semibold
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}