"use client";

import SideNavbar from "@/ui/sidebar";
import Image from "next/image";
import logo from "../../assets/agrow-no-bg-full.png";
import Link from "next/link";
import { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import useScrollThrottle from "@/hooks/useScroll";
import { IoWallet } from "react-icons/io5";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    // true initially, cus collapse gives more width room, and only when users wants to route that is when 
    // they click to uncollapse and show sidebar navs
    const [collapse, setCollapse] = useState(true); 
    const [stick, setStick] = useState(false);
    const stickRef = useRef(false);

    useScrollThrottle(
        "dashboard-main",
        (e: any) => {
            if (e.y >= 15) {
                if (!stickRef.current) setStick(true);
                stickRef.current = true;
            } else {
                if (stickRef.current) setStick(false);
                stickRef.current = false;
            }
        },
        300
    );

    return (
        <div className="flex h-screen w-full overflow-y-auto" id="dashboard-main">
            <SideNavbar collapse={collapse} setCollapse={() => setCollapse(!collapse)} />
            <main className={`Main ${collapse}`}>
                <div className="w-full">
                    <header className={`w-full sticky top-0 right-0 z-10 flex flex-row justify-between item-center ${stick ? "bg-[var(--secondary3)]" : "bg-[var(--secondary3)]/15"} border-b border-b-[rgb(38,39,45)] w-full py-3 pb-4 px-3 sm:px-6`}>
                        <div className="w-fit flex items-center gap-x-3">
                            <button className="p-2 flex items-center justify-center cursor-pointer" onClick={() => setCollapse(!collapse)}>
                                <GiHamburgerMenu className="w-[21px] h-[21px] text-white/81" />
                            </button>
                            <Link href={"/"} className={`items-center text-white w-fit flex lg:hidden`}>
                                <Image src={logo} alt="logo" className={`rounded-[3] w-[24px] h-[24px]`} />
                                <h1 className={`font-sans font-bold text-xl ml-[10px] max-[400px]:hidden`}>AGROW</h1>
                            </Link>
                            <h1 className="text-white/93 text-xl m-0 hidden lg:block">{`Welcome back, Tory 👋`}</h1>
                        </div>
                        <div className="w-fit flex items-center gap-x-4">
                            <button className={`py-2 px-3 flex items-center justify-center cursor-pointer rounded-[5px] ${stick ? "bg-[#282828]" : "bg-[#282828]/36"} ${stick ? "hover:bg-[#121212]/30" : "hover:bg-[#282828]"}`}>
                                <IoMdNotifications className="w-[21px] h-[21px] text-white/85" />
                            </button>
                            <button className={`py-2 px-3 flex items-center justify-center cursor-pointer rounded-[5px]  ${stick ? "bg-[#282828]" : "bg-[#282828]/36"} ${stick ? "hover:bg-[#121212]/30" : "hover:bg-[#282828]"}`}>
                                <IoWallet className="w-[21px] h-[21px] text-white/87" />
                                <span className="text-[16px] ml-[10px] text-white/80 hidden sm:block">Connect wallet</span>
                            </button>
                            <button className={`py-2 px-3 flex items-center justify-center cursor-pointer rounded-[5px]  ${stick ? "bg-[#282828]" : "bg-[#282828]/36"} ${stick ? "hover:bg-[#121212]/30" : "hover:bg-[#282828]"}`}>
                                <MdOutlineAccountCircle className="w-[21px] h-[21px] text-white/85" />
                            </button>
                        </div>
                    </header>
                    {/* <main className="w-full py-3 px-3 sm:px-6">{children}</main> */}
                    <main className="w-full">{children}</main>
                </div>
            </main>
        </div>
    );
}