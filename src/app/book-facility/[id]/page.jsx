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

export default function BookFacilityPage({ params }) {
  const { id } = use(params);

  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [facility, setFacility] = useState(null);

  const [loading, setLoading] = useState(true);

  const [bookingDate, setBookingDate] = useState("");

  const [selectedSlot, setSelectedSlot] = useState("");

  const [duration, setDuration] = useState(1);

  /* LOGIN CHECK */
  useEffect(() => {
    if (!user) {
      toast.error("Please login first");

      router.push("/login");
    }
  }, [user, router]);

  /* FETCH FACILITY */
  useEffect(() => {
    fetch(`http://localhost:8000/facilities/${id}`)
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
          text-2xl
          font-bold
        ">
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
          text-2xl
          font-bold
        ">
        Facility Not Found
      </div>
    );
  }

  /* TOTAL PRICE */
  const totalPrice =
    Number(facility.price_per_hour) * Number(duration);

  /* CONFIRM BOOKING */
  const handleConfirmBooking = async () => {
    if (!bookingDate || !selectedSlot || !duration) {
      toast.error("Please fill all fields");

      return;
    }

   const bookingData = {
  facilityId: facility._id,

  facilityName: facility.name,

  facilityImage: facility.image,

  facilityType: facility.facility_type,

  location: facility.location,

  price: facility.price_per_hour,

  bookingDate: bookingDate,

  bookingSlot: selectedSlot,

  duration: duration,

  userName: user.name,

  userEmail: user.email,

  createdAt: new Date(),
};
    try {
      const res = await fetch(
        "http://localhost:8000/bookings",
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
        py-14
      ">
      <div className="max-w-[1400px] mx-auto">
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
            font-medium
            mt-10
            mb-10
            hover:translate-x-1
          ">
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
            gap-8
          ">
          {/* LEFT */}
          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-[28px]
              overflow-hidden
              backdrop-blur-xl
              shadow-[0_0_40px_rgba(0,0,0,0.25)]
            ">
            {/* IMAGE */}
            <div
              className="
                relative
                h-[350px]
                overflow-hidden
              ">
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
                  top-5
                  left-5
                  bg-cyan-500
                  text-white
                  text-sm
                  font-bold
                  px-4
                  py-2
                  rounded-full
                ">
                {
                  facility.facility_type
                }
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-7">
              <h1
                className="
                  text-4xl
                  font-black
                  text-white
                ">
                {facility.name}
              </h1>

              {/* INFO */}
              <div
                className="
                  grid
                  sm:grid-cols-2
                  gap-4
                  mt-8
                ">
                {/* LOCATION */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                  ">
                  <div className="flex items-center gap-2 text-cyan-400 text-sm">
                    <FaMapMarkerAlt />

                    <span>
                      Location
                    </span>
                  </div>

                  <p
                    className="
                      text-white
                      font-semibold
                      mt-2
                    ">
                    {
                      facility.location
                    }
                  </p>
                </div>

                {/* CAPACITY */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                  ">
                  <div className="flex items-center gap-2 text-cyan-400 text-sm">
                    <IoPeopleOutline />

                    <span>
                      Capacity
                    </span>
                  </div>

                  <p
                    className="
                      text-white
                      font-semibold
                      mt-2
                    ">
                    Up to{" "}
                    {
                      facility.capacity
                    }{" "}
                    players
                  </p>
                </div>

                {/* PRICE */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                  ">
                  <div className="flex items-center gap-2 text-cyan-400 text-sm">
                    <span>
                      ৳
                    </span>

                    <span>
                      Price
                    </span>
                  </div>

                  <p
                    className="
                      text-white
                      font-semibold
                      mt-2
                    ">
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
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                  ">
                  <div className="flex items-center gap-2 text-cyan-400 text-sm">
                    <MdAccessTimeFilled />

                    <span>
                      Slots
                    </span>
                  </div>

                  <p
                    className="
                      text-white
                      font-semibold
                      mt-2
                    ">
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
                  mt-7
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                ">
                <h3
                  className="
                    text-xl
                    font-bold
                    text-white
                    mb-3
                  ">
                  About this facility
                </h3>

                <p className="text-gray-400 leading-8">
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
              rounded-[28px]
              p-8
              backdrop-blur-xl
              shadow-[0_0_40px_rgba(0,0,0,0.25)]
              h-fit
              sticky
              top-10
            ">
            <h2
              className="
                text-4xl
                font-black
                text-white
              ">
              Book This Facility
            </h2>

            <p className="text-gray-400 mt-3">
              Fill all booking information carefully to confirm your reservation.
            </p>

            {/* FORM */}
            <div className="mt-10 space-y-6">
              {/* FACILITY */}
              <div>
                <label
                  className="
                    text-sm
                    text-gray-300
                    font-semibold
                    block
                    mb-2
                  ">
                  Facility Name
                </label>

                <input
                  type="text"
                  value={facility.name}
                  readOnly
                  className="
                    w-full
                    h-[55px]
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    px-5
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
                    text-sm
                    text-gray-300
                    font-semibold
                    mb-2
                  ">
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
                    h-[55px]
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    px-5
                    text-white
                    outline-none
                  "
                />
              </div>

              {/* SLOT */}
              <div>
                <label
                  className="
                    text-sm
                    text-gray-300
                    font-semibold
                    block
                    mb-2
                  ">
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
                    h-[55px]
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    px-5
                    text-white
                    outline-none
                  ">
                  <option
                    value=""
                    className="text-black">
                    Select Slot
                  </option>

                  {facility?.available_slots?.map(
                    (
                      slot,
                      index
                    ) => (
                      <option
                        key={index}
                        value={slot}
                        className="text-black">
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
                    text-sm
                    text-gray-300
                    font-semibold
                    block
                    mb-2
                  ">
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
                    h-[55px]
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    px-5
                    text-white
                    outline-none
                  "
                />
              </div>

              {/* TOTAL */}
              <div
                className="
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  p-6
                ">
                <div className="flex justify-between text-gray-300">
                  <span>
                    ৳
                    {
                      facility.price_per_hour
                    }
                    /hr × {duration} hr
                  </span>

                  <span>
                    ৳
                    {totalPrice}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mt-4
                  ">
                  <h3
                    className="
                      text-2xl
                      font-black
                      text-white
                    ">
                    Total Price
                  </h3>

                  <span
                    className="
                      text-3xl
                      font-black
                      text-cyan-400
                    ">
                    ৳
                    {totalPrice}
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
                  h-[60px]
                  rounded-2xl
                  text-lg
                  font-bold
                  transition-all
                  duration-300
                  ${
                    !bookingDate ||
                    !selectedSlot ||
                    !duration
                      ? "bg-gray-600 cursor-not-allowed text-gray-300"
                      : "bg-cyan-500 hover:bg-cyan-400 hover:scale-[1.02] text-white shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                  }
                `}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}