'use client'
import React, { useEffect, useState } from "react";
import Reservation from "@/components/Reservation";
import { ReservationItem, ReservationJSON } from "../../../interfaces";
import getReservations from "@/libs/getReservations";
import { useSession } from "next-auth/react";
import { Inria_Serif } from "next/font/google";
import Link from "next/link";

const inriaSerif = Inria_Serif({
  weight: ["300", "700"],
  subsets: ["latin"],
});

export default function MyReservationsPage() {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState<ReservationJSON | null>(null);
  const [del, setDel] = useState<boolean>(false);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!session?.user.token) return;

      try {
        const reservationJSON: ReservationJSON = await getReservations(session.user.token);
        setReservations(reservationJSON);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };

    fetchReservations();
  }, [session, del]);

  return (
    <div className="bg-[#e0e5de] flex justify-center w-full min-h-screen absolute top-[70px] pb-10">
      <div className="flex flex-row justify-start w-[100%] flex-wrap" style={{ fontFamily: inriaSerif.className }}>
        {reservations && reservations.data && reservations.data.length > 0 ? (
          reservations.data.map((reservationItem: ReservationItem) => (
            <Reservation
              key={`${reservationItem._id}-${reservationItem.resvDate}`}
              id={reservationItem._id || ""}
              username={reservationItem.name}
              shop={reservationItem.massageShopName}
              province={reservationItem.massageShopProvince}
              date={reservationItem.resvDate}
              onDelete={() => setDel(!del)}
              onUpdate={() => setDel(!del)}
            />
          ))
        ) : (
          <div className="w-full h-full flex justify-center">
            <Link href='./massageShops' className="w-1/4 h-1/3 flex justify-center mt-48">
              <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-2xl w-[90%] h-full">
                {/* Icon */}
                <svg className="w-16 h-16 text-[#3d5e40] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c1.5 2 1.5 4 0 6-1.5-2-1.5-4 0-6zM8 14h8a2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z"/>
                </svg>
                
                {/* Message */}
                <p className="text-2xl font-bold text-[#3d5e40] text-center" style={{ fontFamily: inriaSerif.className }}>
                  No Reservations Made Yet
                </p>
      
                {/* Optional Suggestion */}
                <p className="text-[#3d5e40] mt-2 text-center text-lg">
                  Start by booking a relaxing session!
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}