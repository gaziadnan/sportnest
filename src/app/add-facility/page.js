"use client";

import { useState } from "react";

import Image from "next/image";

import { toast } from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import {
  FaLayerGroup,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  MdOutlineSportsSoccer,
} from "react-icons/md";

import {
  IoMdPricetag,
} from "react-icons/io";

import heroBg from "@/assets/hero-bg.png";

import {
  HiMiniUsers,
} from "react-icons/hi2";

import {
  BiSolidTimeFive,
} from "react-icons/bi";

export default function AddFacilityPage() {
  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const [loading, setLoading] =
    useState(false);

  const [slots, setSlots] =
    useState([]);

  const [slotInput, setSlotInput] =
    useState("");

  const handleAddSlot = () => {
    if (!slotInput) return;

    setSlots([
      ...slots,
      slotInput,
    ]);

    setSlotInput("");
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const facilityData = {
      name: form.name.value,
      facility_type:
        form.facility_type.value,
      location:
        form.location.value,
      price_per_hour:
        Number(
          form.price_per_hour
            .value
        ),
      capacity: Number(
        form.capacity.value
      ),
      available_slots: slots,
      description:
        form.description.value,
      image: form.image.value,

      owner_email:
        user?.email,

      booking_count: 0,

      createdAt:
        new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "http://localhost:8000/facilities",
        {
         
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            facilityData
          ),
        }
      );

      const data =
        await res.json();

      if (data.insertedId) {
        toast.success(
          "Facility Added Successfully"
        );

        form.reset();

        setSlots([]);
      }
    } catch (error) {
      toast.error(
        "Failed To Add Facility"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        min-h-screen
        bg-[#020817]
        px-4
        py-12
        mt-15
      "
    >
      <div
        className="
          max-w-[1250px]
          mx-auto
        "
      >
        {/* TOP */}
        <div className="mb-8">
          <p
            className="
              text-cyan-400
              text-xs
              font-medium
              tracking-wide
            "
          >
            DASHBOARD / FACILITIES
          </p>

          <h1
            className="
              mt-2
              text-2xl
              md:text-3xl
              font-bold
              text-white
            "
          >
            Add New Sports Facility
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-gray-400
            "
          >
            Create and publish your
            sports facility for users
            to book online.
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_350px]
            gap-6
          "
        >
          {/* LEFT */}
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            {/* BASIC INFO */}
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#071120]
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-5
                "
              >
                <FaLayerGroup className="text-cyan-400 text-sm" />

                <h2
                  className="
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  BASIC INFO
                </h2>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                "
              >
                {/* NAME */}
                <div>
                  <label
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Facility Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter facility name"
                    className="
                      mt-2
                      w-full
                      h-[46px]
                      rounded-xl
                      border
                      border-white/10
                      bg-[#020817]
                      px-4
                      text-sm
                      text-white
                      outline-none
                    "
                  />
                </div>

                {/* TYPE */}
                <div>
                  <label
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Facility Type
                  </label>

                  <select
                    name="facility_type"
                    required
                    className="
                      mt-2
                      w-full
                      h-[46px]
                      rounded-xl
                      border
                      border-white/10
                      bg-[#020817]
                      px-4
                      text-sm
                      text-white
                      outline-none
                    "
                  >
                    <option>
                      Football Turf
                    </option>

                    <option>
                      Cricket Ground
                    </option>

                    <option>
                      Swimming Pool
                    </option>

                    <option>
                      Basketball Court
                    </option>

                    <option>
                      Tennis Court
                    </option>

                    <option>
                      Gym Center
                    </option>
                  </select>
                </div>
              </div>

              {/* LOCATION */}
              <div className="mt-4">
                <label
                  className="
                    text-xs
                    text-gray-400
                  "
                >
                  Location
                </label>

                <div className="relative mt-2">
                  <FaMapMarkerAlt
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-cyan-400
                      text-sm
                    "
                  />

                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Enter facility location"
                    className="
                      w-full
                      h-[46px]
                      rounded-xl
                      border
                      border-white/10
                      bg-[#020817]
                      pl-11
                      pr-4
                      text-sm
                      text-white
                      outline-none
                    "
                  />
                </div>
              </div>
            </div>

            {/* LOGISTICS */}
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#071120]
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-5
                "
              >
                <MdOutlineSportsSoccer className="text-cyan-400 text-sm" />

                <h2
                  className="
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  LOGISTICS & SCHEDULE
                </h2>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                "
              >
                {/* PRICE */}
                <div>
                  <label
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Price Per Hour
                  </label>

                  <div className="relative mt-2">
                    <IoMdPricetag
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-cyan-400
                        text-sm
                      "
                    />

                    <input
                      type="number"
                      name="price_per_hour"
                      required
                      placeholder="1200"
                      className="
                        w-full
                        h-[46px]
                        rounded-xl
                        border
                        border-white/10
                        bg-[#020817]
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        outline-none
                      "
                    />
                  </div>
                </div>

                {/* CAPACITY */}
                <div>
                  <label
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Capacity
                  </label>

                  <div className="relative mt-2">
                    <HiMiniUsers
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-cyan-400
                        text-sm
                      "
                    />

                    <input
                      type="number"
                      name="capacity"
                      required
                      placeholder="Maximum players/users"
                      className="
                        w-full
                        h-[46px]
                        rounded-xl
                        border
                        border-white/10
                        bg-[#020817]
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        outline-none
                      "
                    />
                  </div>
                </div>
              </div>

              {/* SLOTS */}
              <div className="mt-5">
                <label
                  className="
                    text-xs
                    text-gray-400
                  "
                >
                  Available Slots
                </label>

                <div
                  className="
                    flex
                    gap-3
                    mt-2
                  "
                >
                  <div className="relative flex-1">
                    <BiSolidTimeFive
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-cyan-400
                        text-sm
                      "
                    />

                    <input
                      type="text"
                      value={slotInput}
                      onChange={(e) =>
                        setSlotInput(
                          e.target.value
                        )
                      }
                      placeholder="6AM - 8AM"
                      className="
                        w-full
                        h-[46px]
                        rounded-xl
                        border
                        border-white/10
                        bg-[#020817]
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        outline-none
                      "
                    />
                  </div>

                  <button
                    type="button"
                    onClick={
                      handleAddSlot
                    }
                    className="
                      h-[46px]
                      px-5
                      rounded-xl
                      bg-cyan-500
                      text-sm
                      font-semibold
                      text-white
                      hover:bg-cyan-400
                      transition-all
                    "
                  >
                    Add
                  </button>
                </div>

                {/* SLOT TAGS */}
                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                    mt-4
                  "
                >
                  {slots.map(
                    (
                      slot,
                      index
                    ) => (
                      <div
                        key={index}
                        className="
                          px-3
                          py-1.5
                          rounded-full
                          bg-cyan-500/10
                          border
                          border-cyan-400/20
                          text-cyan-300
                          text-xs
                        "
                      >
                        {slot}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* MEDIA */}
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#071120]
                p-5
              "
            >
              <h2
                className="
                  text-sm
                  font-semibold
                  text-white
                  mb-4
                "
              >
                MEDIA ASSETS
              </h2>

              <input
                type="text"
                name="image"
                required
                placeholder="Paste facility image URL"
                className="
                  w-full
                  h-[50px]
                  rounded-xl
                  border
                  border-dashed
                  border-white/10
                  bg-[#020817]
                  px-4
                  text-sm
                  text-white
                  outline-none
                "
              />
            </div>

            {/* DESCRIPTION */}
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#071120]
                p-5
              "
            >
              <label
                className="
                  text-xs
                  text-gray-400
                "
              >
                Description
              </label>

              <textarea
                name="description"
                required
                rows={5}
                placeholder="Describe the facility..."
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-[#020817]
                  px-4
                  py-4
                  text-sm
                  text-white
                  outline-none
                  resize-none
                "
              />

              {/* OWNER */}
              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/10
                  bg-[#020817]
                  px-4
                  py-3
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Owner Account
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-white
                    "
                  >
                    {user?.email}
                  </p>
                </div>

                <div
                  className="
                    rounded-full
                    bg-cyan-500/10
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    text-cyan-400
                  "
                >
                  VERIFIED
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div
              className="
                flex
                justify-end
                gap-3
              "
            >
              <button
                type="reset"
                className="
                  h-[46px]
                  px-6
                  rounded-xl
                  border
                  border-white/10
                  text-sm
                  text-gray-300
                  hover:bg-white/5
                  transition-all
                "
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  h-[46px]
                  px-7
                  rounded-xl
                  bg-cyan-600
                  text-sm
                  font-semibold
                  text-white
                  hover:bg-cyan-500
                  transition-all
                "
              >
                {loading
                  ? "Publishing..."
                  : "Publish Facility"}
              </button>
            </div>
          </form>

          {/* RIGHT SIDE */}
          <div
            className="
              hidden
              lg:block
              space-y-5
            "
          >
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#071120]
              "
            >
              <Image
  src={heroBg}
  alt="sports"
  width={800}
  height={320}
  className="
    h-[320px]
    w-full
    object-cover
  "
/>
              <div className="p-5">
                <h2
                  className="
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  Sports Elite Program
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-7
                    text-gray-400
                  "
                >
                  Premium facilities
                  get featured in our
                  daily newsletter to
                  10k+ local athletes.
                </p>
              </div>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-cyan-500/20
                bg-cyan-500/5
                p-5
              "
            >
              <h2
                className="
                  text-sm
                  font-semibold
                  text-cyan-400
                "
              >
                PRO TIP
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  leading-7
                  text-gray-300
                "
              >
                High-quality facility
                photos and detailed
                descriptions increase
                booking rates
                significantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}