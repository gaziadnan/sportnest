"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-hot-toast";

import {
  FaMapMarkerAlt,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";

import {
  MdGroups,
} from "react-icons/md";

export default function ManageFacilitiesPage() {
  const [facilities, setFacilities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  /* FETCH USER FACILITIES */
  useEffect(() => {
  if (!user?.email) return;

  fetch(
    `http://localhost:8000/facilities/my-facilities?email=${user.email}`
  )
    .then((res) => res.json())
    .then((data) => {
      setFacilities(data);

      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
}, [user]);

  /* DELETE */
  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      confirm(
        "Delete this facility?"
      );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:8000/facilities/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (
        data.deletedCount > 0
      ) {
        toast.success(
          "Facility deleted"
        );

        const remaining =
          facilities.filter(
            (item) =>
              item._id !== id
          );

        setFacilities(
          remaining
        );
      }
    } catch (error) {
      toast.error(
        "Delete failed"
      );
    }
  };

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
        "
      >
        Loading...
      </div>
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
        py-16
        mt-10
      "
    >
      <div className="max-w-6xl mx-auto">
        {/* TOP */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            mb-10
            flex-wrap
          "
        >
          <div>
            <h1
              className="
                text-3xl
                font-black
                text-white
              "
            >
              Manage My Facilities
            </h1>

            <p
              className="
                text-sm
                text-gray-400
                mt-1
              "
            >
              Edit or remove your
              listed sports venues.
            </p>
          </div>

          <Link
            href="/add-facility"
            className="
              h-[45px]
              px-5
              rounded-xl
              bg-green-600
              hover:bg-green-500
              transition-all
              duration-300
              text-white
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-lg
            "
          >
            + Add New
          </Link>
        </div>

        {/* EMPTY */}
        {facilities.length ===
          0 && (
          <div
            className="
              rounded-[26px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-14
              text-center
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              No facilities listed
              yet
            </h2>

            <p
              className="
                text-gray-400
                mt-3
                max-w-md
                mx-auto
                leading-7
              "
            >
              Add your first
              facility to start
              receiving bookings.
            </p>

            <Link
              href="/add-facility"
              className="
                inline-flex
                mt-8
                h-[48px]
                px-7
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-400
                transition-all
                duration-300
                text-white
                font-semibold
                items-center
                justify-center
              "
            >
              Add Facility
            </Link>
          </div>
        )}

        {/* FACILITY LIST */}
        <div className="space-y-5">
          {facilities.map(
            (facility) => (
              <div
                key={
                  facility._id
                }
                className="
                  rounded-[24px]
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-4
                  flex
                  items-center
                  justify-between
                  gap-5
                  flex-wrap
                "
              >
                {/* LEFT */}
                <div
                  className="
                    flex
                    items-center
                    gap-5
                    flex-wrap
                  "
                >
                  {/* IMAGE */}
                  {facility.image ? (
                    <div
                      className="
                        relative
                        w-[140px]
                        h-[90px]
                        overflow-hidden
                        rounded-2xl
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
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="
                        w-[140px]
                        h-[90px]
                        rounded-2xl
                        bg-cyan-500/10
                        border
                        border-cyan-500/20
                        flex
                        items-center
                        justify-center
                        text-cyan-400
                        text-sm
                      "
                    >
                      No Image
                    </div>
                  )}

                  {/* INFO */}
                  <div>
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        flex-wrap
                        mb-2
                      "
                    >
                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          bg-cyan-500/10
                          text-cyan-400
                          text-[11px]
                          font-semibold
                        "
                      >
                        {
                          facility.facility_type
                        }
                      </span>

                      <div
                        className="
                          flex
                          items-center
                          gap-1
                          text-gray-400
                          text-xs
                        "
                      >
                        <FaMapMarkerAlt />

                        <span>
                          {
                            facility.location
                          }
                        </span>
                      </div>
                    </div>

                    <h2
                      className="
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {
                        facility.name
                      }
                    </h2>

                    {/* EXTRA */}
                    <div
                      className="
                        flex
                        items-center
                        gap-6
                        flex-wrap
                        mt-4
                      "
                    >
                      <div>
                        <p
                          className="
                            text-[11px]
                            text-gray-400
                          "
                        >
                          Price
                        </p>

                        <h3
                          className="
                            text-white
                            font-semibold
                            text-sm
                          "
                        >
                          $
                          {
                            facility.price_per_hour
                          }
                          /hr
                        </h3>
                      </div>

                      <div>
                        <p
                          className="
                            text-[11px]
                            text-gray-400
                          "
                        >
                          Capacity
                        </p>

                        <h3
                          className="
                            text-white
                            font-semibold
                            text-sm
                            flex
                            items-center
                            gap-1
                          "
                        >
                          <MdGroups />

                          {
                            facility.capacity
                          }{" "}
                          Players
                        </h3>
                      </div>

                      <div
                        className="
                          px-4
                          py-2
                          rounded-xl
                          bg-green-500/15
                          text-green-400
                          text-xs
                          font-semibold
                        "
                      >
                        {facility.booking_count ||
                          0}{" "}
                        Bookings
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  {/* EDIT */}
                  <Link
                    href={`/edit-facility/${facility._id}`}
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/10
                      hover:bg-cyan-500
                      transition-all
                      duration-300
                      text-cyan-400
                      hover:text-white
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaEdit />
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(
                        facility._id
                      )
                    }
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/10
                      hover:bg-red-500
                      transition-all
                      duration-300
                      text-red-400
                      hover:text-white
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}