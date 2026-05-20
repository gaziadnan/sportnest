"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-hot-toast";

export default function FacilityCard({
  facility,
}) {
  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const handleBookNow = () => {
    if (!user) {
      toast.error(
        "Please login first"
      );

      router.push("/login");

      return;
    }

    router.push(
      `/book-facility/${facility._id}`
    );
  };

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-[20px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        hover:border-cyan-400/30
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          h-[240px]
          overflow-hidden
        "
      >
        <Image
          src={facility.image}
          alt={facility.name}
          fill
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
          {
            facility.facility_type
          }
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
          ৳
          {
            facility.price_per_hour
          }
          /hr
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h2
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          {facility.name}
        </h2>

        <p
          className="
            mt-3
            text-sm
            leading-[1.8]
            text-gray-400
          "
        >
          {facility.description}
        </p>

        <button
          onClick={handleBookNow}
          className="
            mt-6
            w-full
            rounded-xl
            bg-cyan-500
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-cyan-400
            hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]
          "
        >
          Book Now →
        </button>
      </div>
    </div>
  );
}