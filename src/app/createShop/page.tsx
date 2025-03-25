'use client';
import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { Inria_Serif } from "next/font/google";
import { MassageShop } from '../../../interfaces';
import { createMassageShop } from "@/libs/createMassageShop";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const inriaSerif = Inria_Serif({
    weight: ["300", "700"],
    subsets: ["latin"],
});

export default function createShop() {
    const [name, setName] = useState<string>("");
    const [promote, setPromote] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [postalcode, setPostalcode] = useState<string>("");
    const [picuture, setPicture] = useState<string>("");
    const [region, setRegion] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [open_close_time, setOpenCloseTime] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { data: session } = useSession();
    const router = useRouter();

    const register = async () => {
        if (name && tel && address && district && province && postalcode && region) {
            try {
                setLoading(true);
                setError(null);

                const item: MassageShop = {
                    name: name,
                    picture: picuture,
                    promote: promote,
                    description: description,
                    address: address,
                    district: district,
                    province: province,
                    postalcode: postalcode,
                    tel: tel,
                    region: region,
                    open_close_time: open_close_time
                };
                if (!session?.user.token) return;
                const token = session.user.token;
                const result = await createMassageShop(token, item);

                setLoading(false);
                setSuccess("Registration successful!");
                router.push("/massageShops"); // Redirect to /massageShops on success
            } catch (error) {
                setLoading(false);
                setError("Registration failed. Please try again.");
            }
        } else {
            setError("Please fill in all fields.");
        }
    };

    return (
        <div className={`flex items-start justify-center min-h-screen w-full ${inriaSerif.className} bg-[#89A178] pt-[120px] pb-[60px]`}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[900px] min-h-[950px] bg-[#d9d9d9] rounded-[50px] p-[20px] mx-4"
            >
                <div className="space-y-10">
                    {[{ label: "Name", value: name, setValue: setName },
                      { label: "Picture", value: picuture, setValue: setPicture },
                      { label: "Promote", value: promote, setValue: setPromote },
                      { label: "Description", value: description, setValue: setDescription },
                      { label: "Address", value: address, setValue: setAddress },
                      { label: "District", value: district, setValue: setDistrict },
                      { label: "Province", value: province, setValue: setProvince },
                      { label: "Postal Code", value: postalcode, setValue: setPostalcode },
                      { label: "Region", value: region, setValue: setRegion },
                      { label: "Telephone", value: tel, setValue: setTel },
                      { label: "Open/Close Time", value: open_close_time, setValue: setOpenCloseTime }]
                      .map((field, idx) => (
                        <div key={idx} className="space-y-3 pt-[30px] flex flex-col items-center">
                            <div className="w-full max-w-[650px]" style={{ fontWeight: "550" }}>
                                <label className="block text-4xl text-[#3d5e40]">{field.label}</label>
                            </div>
                            <div className="w-full flex justify-center">
                                <Input
                                    type={field.label === "Password" ? "password" : "text"}
                                    value={field.value}
                                    onChange={(e) => field.setValue(e.target.value)}
                                    disableUnderline
                                    className="h-[74px] bg-[#89a17845] rounded-[50px] text-xl w-full max-w-[700px] text-center px-8"
                                />
                            </div>
                        </div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: error ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {error && <div className="text-red-500 text-xl text-center">{error}</div>}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: success ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {success && <div className="text-green-500 text-xl text-center">{success}</div>}
                    </motion.div>

                    <div className="flex justify-center mt-10">
                        <Button
                            onClick={register}
                            className={`w-full sm:w-[243px] h-[74px] bg-[#3d5e40] hover:bg-[#2d4730] rounded-[50px] text-4xl text-[#e0e5de] ${inriaSerif.className}`}
                            disabled={loading}
                            sx={{ textTransform: "none" }}
                        >
                            {loading ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
