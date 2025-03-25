'use client';
import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { Inria_Serif } from "next/font/google";
import userRegister from '@/libs/userRegister'
import { User } from '../../../interfaces'
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const formFields = [
  { id: "name", label: "Name" },
  { id: "telephone", label: "Telephone Number" },
  { id: "email", label: "Email" },
  { id: "password", label: "Password", type: "password" },
];

const inriaSerif = Inria_Serif({
  weight: ["300", "700"],
  subsets: ["latin"],
});

export default function Register() {
  const [name, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const register = async () => {
    if (name && tel && email && password) {
      try {
        setLoading(true); 
        setError(null); 

        const item: User = {
          name: name,
          telephone: tel,
          email: email,
          password: password,
        };

        const result = await userRegister(name, email, tel, password); 

        setLoading(false); 
        setSuccess("Registration successful!"); 
        setTimeout(() => {
          router.push('/api/auth/signin');
        }, 1000);
  

      } catch (error) {
        setLoading(false);
        setError("Registration failed. Please try again.");
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div
      className={`flex items-start justify-center min-h-screen w-full ${inriaSerif.className} bg-[#89A178] pt-[120px] pb-[60px]`}
    >
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }} className="w-full max-w-[900px] min-h-[950px] bg-[#d9d9d9] rounded-[50px] p-[20px] mx-4"
      >
        <div className="space-y-10">
          {formFields.map((field) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3 pt-[30px] flex flex-col items-center">
              <div className="w-full max-w-[650px]" style={{ fontWeight: "550" }}>
                <label htmlFor={field.id} className="block text-4xl text-[#3d5e40]">
                  {field.label}
                </label>
              </div>
              <div className="w-full flex justify-center">
                <Input
                  id={field.id}
                  type={field.type || "text"}
                  value={
                    field.id === "name" ? name : field.id === "telephone" ? tel: field.id === "email" ? email: password
                  }
                  onChange={(e) =>
                    field.id === "name"? setName(e.target.value): field.id === "telephone"? setTel(e.target.value) : field.id === "email"? setEmail(e.target.value): setPassword(e.target.value)
                  }
                  disableUnderline
                  className="h-[74px] bg-[#89a17845] rounded-[50px] text-xl w-full max-w-[700px] text-center px-8"
                />
              </div>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: error ? 1 : 0 }} transition={{ duration: 0.5 }}>
            {error && <div className="text-red-500 text-xl text-center">{error}</div>}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: success ? 1 : 0 }} transition={{ duration: 0.5 }}>
            {success && <div className="text-green-500 text-xl text-center">{success}</div>}
          </motion.div>

          <div className="flex justify-center mt-10">
            <Button
              onClick={register} 
              className={`w-full sm:w-[243px] h-[74px] bg-[#3d5e40] hover:bg-[#2d4730] rounded-[50px] text-4xl text-[#e0e5de] ${inriaSerif.className}`}
              disabled={loading}
              sx={{textTransform: "none"}}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
