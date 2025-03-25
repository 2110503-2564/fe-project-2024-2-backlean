'use client';

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Inria_Serif } from "next/font/google";
import Link from "next/link";
import getUserProfile from "../libs/getUserProfile";
import deleteMassageShop from "../libs/deleteMassageShop";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const inriaSerif = Inria_Serif({ weight: ["300", "700"], subsets: ["latin"] });

const formatTime = (time: string) => {
  if (!time || !time.includes(":")) return "Invalid time";
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return "Invalid time";
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export default function MassageShopCard({
  shopName,
  imgSrc,
  promote,
  description,
  location,
  tel,
  hours,
  province,
  id,
  onDelete,
}: {
  shopName: string;
  imgSrc: string;
  promote: string;
  description: string;
  location: string;
  tel: string;
  hours: string;
  province: string;
  id: string;
  onDelete?: () => void;
}) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true); // animation state

  useEffect(() => {
    if (session?.user?.token) {
      const fetchProfile = async () => {
        const profileData = await getUserProfile(session.user.token);
        setProfile(profileData.data);
      };
      fetchProfile();
    }
  }, [session]);

  if (!session?.user.token || !profile) return null;
  const token = session.user.token;

  const [startTime, endTime] = hours.split(" - ");
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  const handleDeleteClick = async () => {
    // Trigger fade-out
    setIsVisible(false);

    // Wait for animation to finish (~300ms)
    setTimeout(async () => {
      try {
        await deleteMassageShop(id, token);
        onDelete?.(); // Call parent refresh
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete");
        setIsVisible(true); // Re-show if failed
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`w-screen pt-4 ${inriaSerif.className} rounded-3xl`}
        >
          <div className="flex flex-row w-full mx-auto overflow-hidden rounded-3xl h-8/9 relative">
            <div className="w-2/5">
              <img className="h-full w-auto object-cover" alt="shops" src={imgSrc} />
            </div>
            <div className="w-3/5 p-8 flex flex-col bg-[#F0F2ED] justify-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                {shopName} - {province}
              </h1>
              <h2 className="text-xl text-gray-700 mb-4">{promote}</h2>
              <p className="text-gray-700 mb-6">{description}</p>
              <ul className="space-y-2 mb-6 text-gray-900">
                <li>• Location: {location}</li>
                <li>• Tel: {tel}</li>
                <li>• Hours: {formattedStartTime} - {formattedEndTime}</li>
              </ul>
              {profile.role === "admin" && (
                <div className="absolute bottom-4 right-4">
                  <button className="text-red-500 text-3xl" onClick={handleDeleteClick}>
                    🗑️
                  </button>
                </div>
              )}
              <Link href={`/reserveShop?id=${id}&massageShop=${shopName}&province=${province}`}>
                <Button
                  sx={{
                    width: "120px",
                    height: "40px",
                    backgroundColor: "#89A178",
                    color: "white",
                    borderRadius: "30px",
                    fontWeight: "100",
                    fontSize: "13px",
                    "&:hover": { backgroundColor: "#6e8c6c" },
                    fontFamily: "Inria Serif, serif",
                  }}
                >
                  Reserve
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
