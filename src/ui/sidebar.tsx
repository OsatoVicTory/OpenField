"use client";

import Image from "next/image";
import logo from "../assets/agrow-no-bg-full.png";
import Link from "next/link";
import { useState } from "react";
import { GrMoney } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { RiDashboardLine, RiP2pLine, RiRefund2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

export default function SideNavbar({ collapse, setCollapse }: { collapse: boolean, setCollapse: () => void }) {

    const navs = [
        { name: "Home", href: "/dashboard", icon: RiDashboardLine },
        { name: "Invest", href: "/invest", icon: GrMoney },
        { name: "P2P", href: "/p2p", icon: RiP2pLine },
        { name: "Loan", href: "/loan", icon: RiRefund2Line },
        { name: "Account", href: "/account", icon: MdManageAccounts }
    ];
    const [route, setRoute] = useState(0);

    return (
        <aside className={`h-screen SideNavbar ${collapse} bg-[rgb(20,20,21)] border-[1px] border-[rgb(38,39,45)]`}>
            <div className={`w-full h-full ${collapse ? "px-2 py-3" : "p-3"} flex flex-col items-between gap-y-4`}>
                <div className="w-full h-fit">
                    <div className="w-full flex items-center justify-between mt-0">
                        <Link href={"/"} className={`flex items-center py-3 text-white w-fit ${collapse ? "px-1" : ""}`}>
                            <Image src={logo} alt="logo" className={`rounded-[3] ${collapse ? "w-[33px] h-[33px]" : "w-[24px]"} h-[25px]`} />
                            <h1 className={`font-bold text-2xl ml-[10px] ${collapse ? "hidden" : ""}`}>OpenField</h1>
                        </Link>
                        <button className="p-2 rounded-sm flex items-center justify-center cursor-pointer border border-[rgb(38,39,45)] md:hidden" onClick={() => setCollapse()}>
                            <GiHamburgerMenu className="w-[18px] h-[18px] text-white/81" />
                        </button>
                    </div>
                    <nav className="w-full flex flex-col gap-y-3 mt-8">
                        {navs.map((navLink, navIndex) => (
                            <Link href={navLink.href} key={`navLink-${navIndex}`}
                            className={`flex items-center w-full rounded-[5] ${collapse ? "p-3" : "p-3"} ${route === navIndex ? "text-white bg-[var(--hover-bg)]" : "text-white/50 hover:bg-[var(--hover-bg)]/50"}`}>
                                <navLink.icon className={`w-[21px] h-[21px] fill-current stroke-current`} />
                                <span className={`${collapse ? "hidden" : ""} text-[17px] text-inherit ml-[10px] font-medium`}>{navLink.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    )
}