
import React from "react";
import EditButton from "./EditButton";
import RemoveButton from "./RemoveButton";
import { Inria_Serif } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import editReservation from "@/libs/editReservation";

  const inriaSerif = Inria_Serif({
    weight: ["300", "700"],
    subsets: ["latin"],
  });

export default function Reservation({id,username, shop, province, date, onDelete, onUpdate} : {id:string, username:string, shop:string, province:string, date:string, onDelete:Function, onUpdate:Function}){
  const {data:session} = useSession()
  const token = session?.user.token
  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedDate, setEditedDate] = useState<string>(date);
  const [editedShop, setEditedShop] = useState<string>(shop);
  const [editedProvince, setEditedProvince] = useState<string>(province);
  const [oldDate, setOldDate] = useState<string>(date);
  const [oldShop, setOldShop] = useState<string>(shop);
  const [oldProvince, setOldProvince] = useState<string>(province);

  if(!token) return;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 500);
  };

  const handleSave = async () => {
    try {
      await editReservation(id,token,{resvDate: editedDate, massageShopName: editedShop, massageShopProvince: editedProvince})
      setIsEditing(false);
      onUpdate();
      setOldShop(editedShop);
      setOldProvince(editedProvince);
      setOldDate(editedDate); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    try{
      setEditedShop(oldShop);
      setEditedProvince(oldProvince);
      setEditedDate(oldDate);
      setIsEditing(false);
    }catch(err){
      console.error(err)
    }
  }


  return (
    <div className={`w-1/2 h-fit p-12 pb-0 ${isDeleting ? "fade-out" : ""}`}>
        <div className="relative w-full h-[367px] bg-[#6e8c6c] rounded-[50px] flex flex-col justify-center items-center"
        style={{ transform: 'scale(0.80)', transformOrigin: 'center', transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(0.85)"}  
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(0.8)"}
        >
          {
            isEditing? (
              <div className="absolute top-12 left-10 text-[#e0e5de] flex flex-col">
                <div className="flex flex-row gap-2 mt-2">
                  <input
                    type="text"
                    value={editedShop}
                    onChange={(e) => setEditedShop(e.target.value)}
                    className="text-white text-2xl p-2 mb-2 w-[192px] rounded-lg bg-[#5c755a] placeholder-gray-400"
                    placeholder="Enter a Massage Shop"
                  />
                  <input
                    type="text"
                    value={editedProvince}
                    onChange={(e) => setEditedProvince(e.target.value)}
                    className="text-white text-2xl p-2 mb-2 w-[183px] rounded-lg bg-[#5c755a] placeholder-gray-400"
                    placeholder="Enter the Province"
                  />
                </div>
                <input
                  type="text"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                  className="text-white text-3xl w-[384px] p-2 mb-2 rounded-lg bg-[#5c755a] placeholder-gray-400"
                  placeholder="Enter a Date"
                />
                <div className="flex flex-row gap-2 mt-2">
                  <button
                  onClick={handleSave}
                  className="bg-white text-3xl text-[#3d5e40] px-4 py-1 rounded-lg hover:bg-[#3d5e40] hover:text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-100 text-3xl text-red-600 px-4 py-1 rounded-lg hover:bg-red-600 hover:text-red-100"
                  >
                    Cancel
                  </button>
                </div>
                
              </div>
            )
            : (
              <>
              <p className={`w-full px-10 [font-family:'Inria_Serif-Bold',Helvetica] font-normal text-[#e0e5de] text-[64px] tracking-[0] leading-[60px] ${inriaSerif.className}`}>
                <span className="font-bold">
                  {username}
                  <br />
                </span>
    
                <span className="font-bold text-[40px]">
                  At {shop} - {province}
                  <br />
                </span>
    
                <span className="text-[32px] ">
                  On {date}
                </span>
              </p>

              <div className={`flex gap-24`}>
                <EditButton onClick={() => setIsEditing(true)}/>
                <RemoveButton id={id} token={token} onDelete={handleDelete}/>
              </div>
              </>
            )
          }

        </div>
    </div>
  );
};