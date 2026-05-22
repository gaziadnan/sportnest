"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { IoPeopleOutline } from "react-icons/io5";

import { MdAccessTimeFilled } from "react-icons/md";

import { toast } from "react-hot-toast";

export default function BookFacilityPage({
  params,
}) {
  const { id } = use(params);

  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const [facility, setFacility] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [bookingDate, setBookingDate] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState("");

  const [duration, setDuration] =
    useState(1);

  /* LOGIN CHECK */
  useEffect(() => {
    if (!user) {
      toast.error("Please login first");

      router.push("/login");
    }
  }, [user, router]);

  /* FETCH FACILITY */
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFacility(data);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  /* LOADING */
  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#020817]
          text-white
          text-lg
          font-bold
        "
      >
        Loading...
      </div>
    );
  }

  if (!facility) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#020817]
          text-red-400
          text-lg
          font-bold
        "
      >
        Facility Not Found
      </div>
    );
  }

  /* TOTAL PRICE */
  const totalPrice =
    Number(facility.price_per_hour) *
    Number(duration);

  /* CONFIRM BOOKING */
  const handleConfirmBooking =
    async () => {
      if (
        !bookingDate ||
        !selectedSlot ||
        !duration
      ) {
        toast.error(
          "Please fill all fields"
        );

        return;
      }

      const bookingData = {
        facilityId: facility._id,

        facilityName: facility.name,

        facilityImage:
          facility.image,

        facilityType:
          facility.facility_type,

        location:
          facility.location,

        price:
          facility.price_per_hour,

        bookingDate: bookingDate,

        bookingSlot:
          selectedSlot,

        duration: duration,

        userName: user.name,

        userEmail: user.email,

        createdAt: new Date(),
      };

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
          {
            method: "POST",

            headers: {
              "Content-Type":
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
            "Booking Confirmed Successfully!"
          );

          router.push(
            "/my-bookings"
          );
        }
      } catch (error) {
        toast.error(
          "Booking Failed"
        );
      }
    };

  return (
    <section
      className="
        min-h-screen
        bg-gradient-to-b
        from-[#020817]
        via-[#071120]
        to-[#020817]
        px-4
        py-10
      "
    >
      <div className="max-w-[1180px] mx-auto">
        {/* BACK BUTTON */}
        <Link
          href="/facilities"
          className="
            inline-flex
            items-center
            gap-2
            text-cyan-400
            hover:text-cyan-300
            transition-all
            duration-300
            text-sm
            font-medium
            mt-4
            mb-6
            hover:translate-x-1
          "
        >
          <FaArrowLeft />

          <span>
            Back to Facilities
          </span>
        </Link>

        {/* MAIN GRID */}
        <div
          className="
            grid
            lg:grid-cols-2
            gap-6
          "
        >
          {/* LEFT */}
          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-[22px]
              overflow-hidden
              backdrop-blur-xl
              shadow-[0_0_30px_rgba(0,0,0,0.25)]
            "
          >
            {/* IMAGE */}
            <div
              className="
                relative
                h-[260px]
                overflow-hidden
              "
            >
              <Image
                src={facility.image}
                alt={facility.name}
                fill
                sizes="100vw"
                className="
                  object-cover
                  hover:scale-105
                  transition-all
                  duration-500
                "
              />

              {/* TYPE */}
              <div
                className="
                  absolute
                  top-4
                  left-4
                  bg-cyan-500
                  text-white
                  text-xs
                  font-bold
                  px-3
                  py-1.5
                  rounded-full
                "
              >
                {facility.facility_type}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h1
                className="
                  text-3xl
                  font-black
                  text-white
                "
              >
                {facility.name}
              </h1>

              {/* INFO */}
              <div
                className="
                  grid
                  sm:grid-cols-2
                  gap-3
                  mt-6
                "
              >
                {/* LOCATION */}
                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-cyan-400
                      text-xs
                    "
                  >
                    <FaMapMarkerAlt />

                    <span>
                      Location
                    </span>
                  </div>

                  <p
                    className="
                      text-white
                      text-sm
                      font-semibold
                      mt-2
                    "
                  >
                    {facility.location}
                  </p>
                </div>

                {/* CAPACITY */}
                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-cyan-400
                      text-xs
                    "
                  >
                    <IoPeopleOutline />

                    <span>
                      Capacity
                    </span>
                  </div>

                  <p
                    className="
                      text-white
                      text-sm
                      font-semibold
                      mt-2
                    "
                  >
                    Up to{" "}
                    {facility.capacity}{" "}
                    players
                  </p>
                </div>

                {/* PRICE */}
                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-cyan-400
                      text-xs
                    "
                  >
                    <span>৳</span>

                    <span>Price</span>
                  </div>

                  <p
                    className="
                      text-white
                      text-sm
                      font-semibold
                      mt-2
                    "
                  >
                    ৳
                    {
                      facility.price_per_hour
                    }
                    /hour
                  </p>
                </div>

                {/* SLOT */}
                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-cyan-400
                      text-xs
                    "
                  >
                    <MdAccessTimeFilled />

                    <span>Slots</span>
                  </div>

                  <p
                    className="
                      text-white
                      text-sm
                      font-semibold
                      mt-2
                    "
                  >
                    {
                      facility
                        ?.available_slots
                        ?.length
                    }{" "}
                    available
                  </p>
                </div>
              </div>

              {/* ABOUT */}
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                "
              >
                <h3
                  className="
                    text-lg
                    font-bold
                    text-white
                    mb-2
                  "
                >
                  About this facility
                </h3>

                <p
                  className="
                    text-gray-400
                    text-sm
                    leading-7
                  "
                >
                  {facility.description ||
                    "Premium sports facility with world-class environment and modern booking experience."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-[22px]
              p-6
              backdrop-blur-xl
              shadow-[0_0_30px_rgba(0,0,0,0.25)]
              h-fit
              sticky
              top-8
            "
          >
            <h2
              className="
                text-3xl
                font-black
                text-white
              "
            >
              Book This Facility
            </h2>

            <p
              className="
                text-gray-400
                text-sm
                mt-2
                leading-6
              "
            >
              Fill all booking
              information carefully
              to confirm your
              reservation.
            </p>

            {/* FORM */}
            <div className="mt-7 space-y-5">
              {/* FACILITY */}
              <div>
                <label
                  className="
                    text-xs
                    text-gray-300
                    font-semibold
                    block
                    mb-2
                  "
                >
                  Facility Name
                </label>

                <input
                  type="text"
                  value={facility.name}
                  readOnly
                  className="
                    w-full
                    h-[48px]
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    px-4
                    text-sm
                    text-white
                    outline-none
                  "
                />
              </div>

              {/* DATE */}
              <div>
                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-gray-300
                    font-semibold
                    mb-2
                  "
                >
                  <FaCalendarAlt />
                  Booking Date
                </label>

                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) =>
                    setBookingDate(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-[48px]
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    px-4
                    text-sm
                    text-white
                    outline-none
                  "
                />
              </div>

              {/* SLOT */}
              <div>
                <label
                  className="
                    text-xs
                    text-gray-300
                    font-semibold
                    block
                    mb-2
                  "
                >
                  Select Time Slot
                </label>

                <select
                  value={selectedSlot}
                  onChange={(e) =>
                    setSelectedSlot(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-[48px]
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    px-4
                    text-sm
                    text-white
                    outline-none
                  "
                >
                  <option
                    value=""
                    className="text-black"
                  >
                    Select Slot
                  </option>

                  {facility?.available_slots?.map(
                    (slot, index) => (
                      <option
                        key={index}
                        value={slot}
                        className="text-black"
                      >
                        {slot}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* DURATION */}
              <div>
                <label
                  className="
                    text-xs
                    text-gray-300
                    font-semibold
                    block
                    mb-2
                  "
                >
                  Duration (Hours)
                </label>

                <input
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) =>
                    setDuration(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-[48px]
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    px-4
                    text-sm
                    text-white
                    outline-none
                  "
                />
              </div>

              {/* TOTAL */}
              <div
                className="
                  rounded-xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  p-5
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    text-sm
                    text-gray-300
                  "
                >
                  <span>
                    ৳
                    {
                      facility.price_per_hour
                    }
                    /hr × {duration} hr
                  </span>

                  <span>
                    ৳{totalPrice}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mt-3
                  "
                >
                  <h3
                    className="
                      text-xl
                      font-black
                      text-white
                    "
                  >
                    Total Price
                  </h3>

                  <span
                    className="
                      text-2xl
                      font-black
                      text-cyan-400
                    "
                  >
                    ৳{totalPrice}
                  </span>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={
                  handleConfirmBooking
                }
                disabled={
                  !bookingDate ||
                  !selectedSlot ||
                  !duration
                }
                className={`
                  w-full
                  h-[52px]
                  rounded-xl
                  text-sm
                  font-bold
                  transition-all
                  duration-300
                  ${
                    !bookingDate ||
                    !selectedSlot ||
                    !duration
                      ? "bg-gray-600 cursor-not-allowed text-gray-300"
                      : "bg-cyan-500 hover:bg-cyan-400 hover:scale-[1.02] text-white shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                  }
                `}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}