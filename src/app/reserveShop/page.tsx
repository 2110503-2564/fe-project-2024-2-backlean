'use client'
import { Input, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { Inria_Serif } from "next/font/google";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useSession } from "next-auth/react";
import { createReservation } from "@/libs/createReservations";
import { useSearchParams } from "next/navigation";
const inriaSerif = Inria_Serif({
  weight: ["300", "700"],
  subsets: ["latin"],
});

export default function ReserveShop() {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [massageShopID, setMassageShopID] = useState<string | null>(null);
  const [massageShopName, setMassageShopName] = useState<string | null>(null);
  const [massageShopProvince, setmassageShopProvince] = useState<string | null>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    setMassageShopID(searchParams.get('id'));
    setMassageShopName(searchParams.get('massageShop'));
    setmassageShopProvince(searchParams.get('province'));
  }, [searchParams]);


  const { data: session } = useSession();
  const handleReserve = async () => {
    if (reserveDate) {
      const reservationItem = {
        resvDate: dayjs(reserveDate).format("YYYY/MM/DD"),
        massageShop: massageShopID || "",
        massageShopName: massageShopName || "",
        massageShopId: massageShopID || "",
        massageShopProvince: massageShopProvince || "",
        name: session?.user.name || "",
      };
      try {
        const token = session?.user.token;
        if (!token) {
          return;
        }
        const response = await createReservation(token, reservationItem);
        console.log('Reservation created:', response);
        alert("Reservation confirmed!");
      } catch (error) {
        console.log(error);
        
        const errorMessage = (error as Error).message;

        if (errorMessage?.includes("The user with ID")) {
          alert("Reservation failed: You have already made 3 reservations.");
        } else {
          alert("Reservation failed. Please try again.");
        }
      }
    }
    else {
      alert("Please fill the date")
    }
}

    return (
      <div
        className={`flex justify-center flex-col items-center min-h-screen bg-[#3D5E40] px-4 pt-24 pb-24 ${inriaSerif.className}`}
      >
        <div style={{ transform: 'scale(0.75)', transformOrigin: 'center' }}>
          <h1 className="text-5xl md:text-7xl tracking-wide font-bold text-white text-center mb-10">
            Reservation
          </h1>

          <div className="w-full max-w-[620px] rounded-[50px] bg-[#89a178] text-white overflow-hidden">
            <div className="p-6 md:p-10">
              <div className="flex flex-col items-center">
                <h2 className="text-3xl md:text-[56px] font-bold text-center mb-12">
                  So/ Spa - Bangkok
                </h2>

                <div className="w-full flex flex-col items-center">
                  <h3 className="text-2xl md:text-[40px] font-bold text-center mb-8">
                    Reservation Date
                  </h3>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="">
                      <MobileDatePicker
                        defaultValue={null}
                        onChange={(newValue) => setReserveDate(newValue)}
                        slots={{
                          textField: (params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  color: "#341c02",
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  marginBottom: "30px",
                                },
                              }}
                              InputLabelProps={{ shrink: true }}
                              sx={{
                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              className="bg-[#e0e5de] rounded-[30px] text-center h-[50px] max-w-full w-[100%] sm:w-[250px] md:w-[300px] lg:w-[350px] pl-28 pt-8"
                            />

                          ),
                        }}
                      />
                    </DemoItem>
                  </LocalizationProvider>

                  {/* Add space between the date picker and the button */}
                  <Button
                    className={` w-full max-w-[250px] h-[70px] bg-[#6e8c6c] text-white rounded-[30px] font-bold text-2xl 
                      md:text-[40px] ${inriaSerif.className} mt-6 hover:bg-[#3D5E40]`}
                    onClick={handleReserve}
                    sx={{textTransform: "none"}}
                  >
                    Reserve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }