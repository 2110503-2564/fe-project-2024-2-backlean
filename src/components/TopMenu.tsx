import TopMenuItem from "@/components/TopMenuItem";
import { Inria_Serif } from "next/font/google";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import Link from "next/link";
import React from "react";

const inriaSerif = Inria_Serif({
  weight: ["300", "700"],
  subsets: ["latin"],
});


export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  const menuItems = [
    { text: "Massage Shops", isActive: true, href: "/massageShops", alignRight: false },
    { text: "My Reservations", isActive: false, href: "/reservations", alignRight: false },
    { text: "Register", isActive: false, href: "/register", alignRight: true },
    // Removed Sign-In item, will add Sign-In/Sign-Out conditional rendering below
  ];

  return (
    <header className="w-full bg-[#1b1b1b] h-[70px] fixed top-0 left-0 z-30 border-b border-neutral-700">
      <div className="flex items-center h-full w-full justify-between">
        {/* Logo */}
        <Link href={'/'}>
          <div className="h-[70px] w-[70px] flex-shrink-0">
            <img className="h-[70px]" alt="Logo" src="/images/Logo.png" />
          </div>
        </Link>

        {/* Left Navigation */}
        <nav className="flex flex-grow justify-start">
          <ul className="flex list-none p-0 m-0">
            {menuItems.filter(item => !item.alignRight).map((item, index) => (
              <li key={index} className="h-[70px] flex items-center">
                <div
                  // className={`px-6 text-white text-xl text-center ${item.isActive ? "font-bold" : "font-normal"} ${inriaSerif.className}`}
                  className={`w-[240px] flex items-center justify-center h-full text-white text-xl text-center ${inriaSerif.className} hover:bg-[#3D5E40] transition-colors duration-500`}
                >
                  <TopMenuItem title={item.text} pageRef={item.href} />
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Navigation */}
        <nav className="flex justify-end">
          <ul className="flex list-none p-0 m-0">
            {menuItems.filter(item => item.alignRight).map((item, index) => (
              <li key={index} className="h-[70px] flex items-center">
                <div
                  // className={`px-6 text-white text-xl text-center ${item.isActive ? "font-bold" : "font-normal"} ${inriaSerif.className}`}
                  className={`w-[160px] flex items-center justify-center h-full text-white text-xl text-center ${inriaSerif.className} hover:bg-[#3D5E40] transition-colors duration-500`}
                >
                  <TopMenuItem title={item.text} pageRef={item.href} />
                </div>
              </li>
            ))}

            {/* Conditionally render Sign-In or Sign-Out */}
            <li className="h-[70px] flex items-center">
              {session ? (
                <Link href="/api/auth/signout" className="h-full">
                  <div className={`px-6 w-[160px] flex items-center justify-center h-full text-white text-xl text-center ${inriaSerif.className} hover:bg-[#3D5E40] transition-colors duration-500`}>
                    Sign-Out
                  </div>
                </Link>
              ) : (
                <Link href="/api/auth/signin" className="h-full">
                  <div className={`px-6 w-[160px] flex items-center justify-center h-full text-white text-xl text-center ${inriaSerif.className} hover:bg-[#3D5E40] transition-colors duration-500`}>
                    Sign-In
                  </div>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}