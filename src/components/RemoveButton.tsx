import React from "react";
import { Inria_Serif } from "next/font/google";
import deleteReservation from "@/libs/deleteReservation";

const inriaSerif = Inria_Serif({
  weight: ["300", "700"],
  subsets: ["latin"],
});

interface Props {
  id: string;
  token: string;
  onDelete: () => void;
}

export default function RemoveButton({ id, token, onDelete }: Props) {
  const handleDelete = async () => {
    try {
      await deleteReservation(id, token);
      onDelete();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <button
      className="box-border w-[182px] h-[57px] mt-5 rounded-[50px] relative bg-[#e0e5de] text-[#3d5e40] hover:bg-[#3d5e40] hover:text-[#e0e5de]"
      onClick={handleDelete}
      style={{ transition: "0.3s ease-in-out" }}
    >
      <div
        className={`${inriaSerif.className} mt-2 w-[182px] text-3xl h-[51px] font-bold text-center`}
      >
        Remove
      </div>
    </button>
  );
}
