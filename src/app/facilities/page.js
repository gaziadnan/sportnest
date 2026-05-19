"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

import { toast } from "sonner";

export default function FacilitiesPage() {

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sportType, setSportType] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  /* FETCH DATA */

  useEffect(() => {

    fetch("http://localhost:8000/facilities")
      .then((res) => res.json())
      .then((data) => {

        setFacilities(data);
        setLoading(false);

      })
      .catch(() => {

        toast.error("Failed to load facilities");
        setLoading(false);

      });

  }, []);

  /* FILTER */

  const filteredFacilities = useMemo(() => {

    return facilities.filter((facility) => {

      const matchSearch =
        facility.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchType =
        sportType === "All"
          ? true
          : facility.facility_type === sportType;

      return matchSearch && matchType;

    });

  }, [facilities, search, sportType]);

  /* PAGINATION */

  const totalPages = Math.ceil(
    filteredFacilities.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentFacilities =
    filteredFacilities.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  /* BOOK NOW */

  const handleBookNow = (facility) => {

    const user =
      localStorage.getItem("user");

    if (!user) {

      toast.error("Please login first");

      window.location.href = "/login";

      return;
    }

    const bookingData = {

      facilityId: facility._id,
      facilityName: facility.name,
      image: facility.image,
      price: facility.price_per_hour,
      location: facility.location,
      bookedAt: new Date(),

      userEmail:
        JSON.parse(user).email,

      userName:
        JSON.parse(user).name,
    };

    fetch("http://localhost:8000/bookings", {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        bookingData
      ),

    })
      .then((res) => res.json())
      .then(() => {

        toast.success(
          "Facility booked successfully"
        );

      })
      .catch(() => {

        toast.error(
          "Booking failed"
        );

      });
  };

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
        "
      >
        Loading Facilities...
      </div>
    );
  }

  return (
    <section
      className="
        min-h-screen
        px-4
        py-24
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
        {/* TOP */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            gap-5
            justify-between
            items-center
            mb-12
          "
        >
          {/* SEARCH */}

          <div
            className="
              relative
              w-full
              lg:w-[450px]
            "
          >
            <FaSearch
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-cyan-400
              "
            />

            <input
              type="text"
              placeholder="Search by facility name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                h-[60px]
                rounded-2xl
                bg-white/5
                border
                border-white/10
                pl-14
                pr-5
                text-white
                outline-none
                focus:border-cyan-400
              "
            />
          </div>

          {/* FILTER */}

          <select
            value={sportType}
            onChange={(e) =>
              setSportType(
                e.target.value
              )
            }
            className="
              w-full
              lg:w-[250px]
              h-[60px]
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-5
              text-white
              outline-none
              focus:border-cyan-400
            "
          >
            <option value="All">
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

            <option value="Fitness">
              Fitness
            </option>

            <option value="Badminton">
              Badminton
            </option>

            <option value="Tennis">
              Tennis
            </option>

            <option value="Rock Climbing">
              Rock Climbing
            </option>
          </select>
        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {currentFacilities.map(
            (facility) => (

              <div
                key={facility._id}
                className="
                  rounded-[30px]
                  overflow-hidden
                  bg-white/5
                  border
                  border-white/10
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-cyan-400/30
                  hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]
                "
              >
                {/* IMAGE */}

                <div
                  className="
                    h-[240px]
                    overflow-hidden
                  "
                >
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      hover:scale-110
                      duration-500
                    "
                  />
                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >
                    <h2
                      className="
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {facility.name}
                    </h2>

                    <span
                      className="
                        bg-cyan-400/10
                        text-cyan-400
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                      "
                    >
                      ৳
                      {
                        facility.price_per_hour
                      }
                      /hr
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-gray-400
                      mt-4
                    "
                  >
                    <FaMapMarkerAlt />

                    <span>
                      {
                        facility.location
                      }
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-gray-400
                      mt-3
                    "
                  >
                    <FaUsers />

                    <span>
                      Capacity:
                      {" "}
                      {
                        facility.capacity
                      }
                    </span>
                  </div>

                  <p
                    className="
                      mt-5
                      text-gray-400
                      leading-[1.8]
                    "
                  >
                    {
                      facility.description
                    }
                  </p>

                  {/* BUTTON */}

                  <button
                    onClick={() =>
                      handleBookNow(
                        facility
                      )
                    }
                    className="
                      mt-6
                      w-full
                      h-[55px]
                      rounded-2xl
                      bg-cyan-400
                      text-black
                      font-bold
                      transition-all
                      duration-300
                      hover:bg-white
                    "
                  >
                    Book Now
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
            gap-4
            mt-16
          "
        >
          {[...Array(totalPages)].map(
            (_, index) => (

              <button
                key={index}
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
                className={`
                  w-12
                  h-12
                  rounded-full
                  font-bold
                  transition-all
                  duration-300

                  ${
                    currentPage ===
                    index + 1

                      ? `
                        bg-cyan-400
                        text-black
                      `

                      : `
                        bg-white/5
                        border
                        border-white/10
                        text-white
                        hover:border-cyan-400
                      `
                  }
                `}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}