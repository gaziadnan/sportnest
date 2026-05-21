import FacilityCard from "./FacilityCard";

import { getFacilities } from "@/lib/api";

export default async function FeaturedFacilities() {
  const facilities =
    await getFacilities();

  // const featuredFacilities =
  //   facilities.slice(0, 6);
  const featuredFacilities =
  facilities?.facilities?.slice(
    0,
    6
  ) || [];

  return (
    <section
      className="
        relative
        pt-24
        pb-14
        px-4
        overflow-hidden
        bg-gradient-to-b
        from-[#071120]
        via-[#08111f]
        to-[#020817]
      "
    >
      {/* TOP BLUR EFFECT */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          bg-cyan-500/10
          blur-[140px]
          rounded-full
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          max-w-[1400px]
          mx-auto
        "
      >
        {/* TITLE */}
        <div className="text-center">
          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              text-white
            "
          >
            Featured

            <span className="text-cyan-400">
              {" "}
              Facilities
            </span>
          </h2>

          <p
            className="
              mt-5
              text-gray-400
              max-w-[760px]
              mx-auto
              leading-[1.9]
              text-[17px]
            "
          >
            Experience premium sports
            environments designed for
            athletes, teams, and sports
            enthusiasts. Discover the
            most booked and top-rated
            facilities across the city.
          </p>
        </div>

        {/* GRID */}
        <div
          className="
            mt-16
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {featuredFacilities.map(
            (facility) => (
              <FacilityCard
                key={facility._id}
                facility={facility}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}