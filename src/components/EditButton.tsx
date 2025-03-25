import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Inria_Serif } from "next/font/google";

  const inriaSerif = Inria_Serif({
    weight: ["300", "700"],
    subsets: ["latin"],
  });

interface Props {
  stateProp: "hover" | "default";
}

export default function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className={`box-border w-[182px] h-[57px] mt-5 rounded-[50px] relative bg-[#e0e5de] text-[#3d5e40] hover:bg-[#3d5e40] hover:text-[#e0e5de]`}
      style={{ transition: "0.3s ease-in-out" }} onClick={onClick}
    >
      <div
        className={`${inriaSerif.className} w-[182px] left-0 tracking-[0] text-3xl top-2 h-[51px] font-bold text-center leading-[normal] absolute`}
      >
        Edit
      </div>
    </button>
  );
};