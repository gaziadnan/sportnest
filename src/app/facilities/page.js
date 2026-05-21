"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  IoPeopleOutline,
} from "react-icons/io5";

import {
  MdAccessTimeFilled,
} from "react-icons/md";

import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";

export default function FacilitiesPage() {
  const [facilities, setFacilities] =
    useState([]);

  const [
    filteredFacilities,
    setFilteredFacilities,
  ] = useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedSport, setSelectedSport] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalFacilities, setTotalFacilities] =
    useState(0);

  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const itemsPerPage = 9;

  /* FETCH DATA */
  useEffect(() => {
    fetch(
      `http://localhost:8000/facilities?page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFacilities(
          data.facilities || []
        );

        setFilteredFacilities(
          data.facilities || []
        );

        setTotalFacilities(
          data.total || 0
        );
      });
  }, [currentPage]);

  /* SEARCH + FILTER */
  useEffect(() => {
    let filtered = [...facilities];

    /* SEARCH */
    if (search) {
      filtered = filtered.filter(
        (facility) =>
          facility.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }

    /* FILTER */
    if (
      selectedSport !== "All"
    ) {
      filtered = filtered.filter(
        (facility) =>
          facility.facility_type ===
          selectedSport
      );
    }

    setFilteredFacilities(
      filtered
    );
  }, [
    search,
    selectedSport,
    facilities,
  ]);

  /* SPORTS */
  const sports = [
    "All",
    ...new Set(
      facilities?.map(
        (item) =>
          item.facility_type
      ) || []
    ),
  ];

  /* PAGINATION */
  const totalPages =
    Math.ceil(
      totalFacilities /
        itemsPerPage
    );

  const currentFacilities =
    filteredFacilities;

  /* PAGE CHANGE */
  const handlePageChange = (
    page
  ) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* BOOK PAGE NAVIGATION */
  const handleBookingPage = (
    facilityId
  ) => {
    if (!user) {
      toast.error(
        "Please login first"
      );

      router.push("/login");

      return;
    }

    router.push(
      `/book-facility/${facilityId}`
    );
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
        py-20
        mt-5
      "
    >
      <div className="max-w-[1400px] mx-auto">
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
            Explore Premium{" "}
            <span className="text-cyan-400">
              Sports Facilities
            </span>
          </h1>

          <p
            className="
              mt-5
              max-w-[750px]
              mx-auto
              text-gray-400
              leading-[1.9]
            "
          >
            Discover world-class
            sports venues, football
            arenas, swimming pools,
            badminton courts, and
            elite fitness centers
            designed for modern
            athletes.
          </p>
        </div>

        {/* SEARCH */}
        <div
          className="
            flex
            items-center
            gap-3
            bg-white/5
            border
            border-white/10
            backdrop-blur-xl
            rounded-2xl
            px-5
            py-4
            mb-10
          "
        >
          <FaSearch className="text-cyan-400 text-lg" />

          <input
            type="text"
            placeholder="Search by facility name..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              bg-transparent
              outline-none
              text-white
              placeholder:text-gray-500
            "
          />
        </div>

        <div className="flex gap-8">
          {/* FILTER */}
          <div
            className="
              hidden
              lg:block
              w-[250px]
              h-fit
              rounded-[26px]
              border
              border-white/10
              bg-[#071120]
              p-6
              shadow-[0_0_30px_rgba(0,0,0,0.25)]
            "
          >
            {/* TOP */}
            <div
              className="
                flex
                justify-between
                items-center
                mb-6
              "
            >
              <h2
                className="
                  text-3xl
                  font-bold
                  text-white
                "
              >
                Filters
              </h2>

              <button
                onClick={() =>
                  setSelectedSport(
                    "All"
                  )
                }
                className="
                  text-cyan-400
                  text-sm
                  font-medium
                "
              >
                Reset All
              </button>
            </div>

            <div className="border-b border-white/10 mb-6" />

            {/* SPORT TYPE */}
            <div>
              <h3
                className="
                  text-gray-300
                  text-sm
                  font-bold
                  tracking-wide
                  mb-5
                "
              >
                SPORT TYPE
              </h3>

              <div className="space-y-4">
                {sports.map(
                  (
                    sport,
                    index
                  ) => (
                    <label
                      key={index}
                      className="
                        flex
                        items-center
                        gap-3
                        cursor-pointer
                        text-gray-300
                        hover:text-cyan-400
                        transition-all
                        duration-300
                      "
                    >
                      <input
                        type="radio"
                        name="sport"
                        checked={
                          selectedSport ===
                          sport
                        }
                        onChange={() =>
                          setSelectedSport(
                            sport
                          )
                        }
                        className="
                          accent-cyan-400
                          w-4
                          h-4
                        "
                      />

                      <span>
                        {sport}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="flex-1">
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-5
              "
            >
              {currentFacilities.map(
                (
                  facility
                ) => (
                  <div
                    key={
                      facility._id
                    }
                    className="
                      group
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-white/10
                      bg-white/5
                      backdrop-blur-xl
                      hover:border-cyan-400/30
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]
                      max-w-[320px]
                      mx-auto
                      w-full
                    "
                  >
                    {/* IMAGE */}
                    {/* IMAGE */}
{facility.image && (
  <div
    className="
      relative
      h-[170px]
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
        group-hover:scale-110
        transition-transform
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
        py-1
        rounded-full
      "
    >
      {facility.facility_type}
    </div>

    {/* PRICE */}
    <div
      className="
        absolute
        top-4
        right-4
        bg-white
        text-cyan-600
        text-sm
        font-bold
        px-3
        py-1
        rounded-full
      "
    >
      ৳{facility.price_per_hour}/hr
    </div>
  </div>
)}
                    

                    {/* CONTENT */}
                    <div
  className={
    facility.image
      ? "p-5"
      : "p-6"
  }
>
                      <h2
                        className="
                          text-xl
                          font-bold
                          text-white
                        "
                      >
                        {
                          facility.name
                        }
                      </h2>

                      <div
                        className="
                          mt-4
                          space-y-2
                          text-gray-400
                          text-sm
                        "
                      >
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-cyan-400" />

                          <span>
                            {
                              facility.location
                            }
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <IoPeopleOutline className="text-cyan-400" />

                          <span>
                            Capacity:{" "}
                            {
                              facility.capacity
                            }
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MdAccessTimeFilled className="text-cyan-400" />

                          <span>
                            {
                              facility
                                ?.available_slots
                                ?.length || 0
                            }{" "}
                            slots available
                          </span>
                        </div>
                      </div>

                      {/* BUTTON */}
                      <button
                        onClick={() =>
                          handleBookingPage(
                            facility._id
                          )
                        }
                        className="
                          mt-5
                          w-full
                          rounded-xl
                          bg-cyan-500
                          py-2.5
                          text-sm
                          font-semibold
                          text-white
                          transition-all
                          duration-300
                          hover:bg-cyan-400
                        "
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* PAGINATION */}
            <div
              className="
                flex
                justify-center
                items-center
                gap-3
                mt-14
                flex-wrap
              "
            >
              {[...Array(totalPages)].map(
                (
                  _,
                  index
                ) => (
                  <button
                    key={index}
                    onClick={() =>
                      handlePageChange(
                        index +
                          1
                      )
                    }
                    className={`
                      w-11
                      h-11
                      rounded-full
                      font-semibold
                      transition-all
                      duration-300
                      ${
                        currentPage ===
                        index + 1
                          ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                          : "bg-white/5 text-gray-300 hover:bg-cyan-500/20"
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
