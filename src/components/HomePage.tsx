'use client'
  import React from "react";
  import { Button } from "@mui/material";
  import Link from "next/link";
  import { Inria_Serif } from "next/font/google";
  import { useRouter } from "next/navigation";
  import { motion } from "framer-motion";
  const inriaSerif = Inria_Serif({
    weight: ["300", "700"],
    subsets: ["latin"],
  });

  const coverImages = [
    { id: 1, src: "/images/cover1.jpg", alt: "Spa products with lavender, oils and crystals" },
    { id: 4, src: "/images/cover4.jpg", alt: "Spa setting with light colors" },
    { id: 2, src: "/images/cover2.jpg", alt: "Person receiving back treatment" },
    { id: 5, src: "/images/cover5.jpg", alt: "Hands performing massage treatment" },
    { id: 3, src: "/images/cover3.jpg", alt: "Candle and spa elements" },
    { id: 6, src: "/images/cover6.jpg", alt: "Wellness tools and candles" },
  ];

  const leftColumnImages = [coverImages[0], coverImages[2], coverImages[4]];
  const rightColumnImages = [coverImages[1], coverImages[3], coverImages[5]];

  export default function Main() {
    const router = useRouter();

    return (
      <motion.main
      className={`flex flex-col md:flex-row w-full`}
      style={{
        minHeight: "100vh",
        width: "100vw",
        fontFamily: inriaSerif.className,
      }}
      initial={{ opacity: 0 }}  // Initial state
      animate={{ opacity: 1 }}  // Final state
      exit={{ opacity: 0 }}     // Exit state
      transition={{ duration: 1 }}  // Smooth transition duration
    >
      <main
        className={`flex flex-col md:flex-row w-full`}
        style={{
          minHeight: "100vh",
          width: "100vw",
          fontFamily: inriaSerif.className,
        }}
      >
        {/* Left Side – Image Grid with More Top Padding */}
        <div className="w-full md:w-1/2 bg-transparent p- flex gap-4 justify-center">
          <div className="flex flex-col gap-4 items-center pt-20">
            {leftColumnImages.map((img) => (
              <div key={img.id} className="w-full max-w-[300px] sm:max-w-[149px]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                  style={{
                    borderRadius: "40px", 
                    maxWidth: "100%",
                    height: "auto",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}  
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center pt-8">
            {rightColumnImages.map((img) => (
              <div key={img.id} className="w-full max-w-[600px] sm:max-w-[256px]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                  style={{
                    borderRadius: "40px", 
                    maxWidth: "100%",
                    height: "auto",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}  
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* Right Side – Text and CTA */}
        <div
          className="w-full md:w-2/5 flex flex-col justify-center items-center p-6"
          style={{
            display: "flex", // Added to ensure flexbox layout
            justifyContent: "center", // Centers the content vertically
            alignItems: "center", // Centers the content horizontally
            paddingTop: "170px",
          }}
        >
          <div className="w-full flex flex-col items-center justify-center space-y-6">
            <h1
              className="text-[#3d5e40] text-3xl md:text-5xl leading-tight tracking-normal whitespace-nowrap"
              style={{ fontWeight: 550, letterSpacing: "5%" }}
            >
              Everyone Deserves Rest
            </h1>
            <p
              className="text-[#6E8C6C] font-light text-xl md:text-2xl whitespace-nowrap"
              style={{ letterSpacing: "5%" }}
            >
              Let Us Help You Find the Perfect Place for It.
            </p>
  
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6e8c6c",
                color: "#e0e5de",
                padding: "14px 40px",
                borderRadius: "50px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: inriaSerif.className,
                textTransform: "none",
                transition: "background-color 0.5s ease-in-out",
                '&:hover': {
                  backgroundColor: "#3D5E40",
                }
              }}
              onClick={()=>{ router.push('/massageShops') }}
            >
              Browse Massage Shops
            </Button>
  
            <div className="text-[#3d5e40] text-sm mt-4">
              <span>Don't have an account yet? </span>
              <Link href="/register" className="underline hover:text-[#8d7a5b]">
                Register Here
              </Link>
            </div>
          </div>
        </div>
      </main>
       </motion.main>
    );
  }
  
  
  