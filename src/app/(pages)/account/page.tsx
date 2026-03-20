"use client";

import AccountAbout from "@/components/dashboard/accountAbout";
import AccountAgentSettings from "@/components/dashboard/accountAgent";
import AccountSettings from "@/components/dashboard/accountSettings";
import AccountTokens from "@/components/dashboard/accountTokens";
import Copy from "@/components/ui/copy";
import { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function Account() {

    const [route, setRoute] = useState("tokens_created");

    function RoutePage() {
        switch(route) {
            case "tokens_bought":
                return <AccountTokens />
            case "agent":
                return <AccountAgentSettings />
            case "settings":
                return <AccountSettings />
            case "about":
                return <AccountAbout />
            default:
                return <AccountTokens /> // return tokens_created
        }
    };

    return (
        <div className="w-full h-full Account">
            <div className="w-full Token_Page mt-[-80px]">
                <div className="w-full h-[330px] relative">
                    <div className="w-full h-full bg-[var(--primary-light)]"></div>
                    <div className="size-full tk_gradient_low absolute inset-0"></div>
                </div>

                <div className="w-full bg-[rgb(20,20,21)]">
                    <div className="w-full px-4 md:px-8 mt-[-120px] pb-7 flex flex-col border-b border-b-[rgb(38,39,45)]">
                        <div className="w-full flex flex-col">
                            <div className="w-[150px] h-[150px] rounded-full bg-white/60 border-grey border z-10 relative"></div>

                            <div className="w-full flex flex-col md:flex-row justify-between gap-y-5 md:gap-x-3 z-10 relative mt-4"> 
                                <div className="flex flex-col gap-y-2 flex-grow max-md:w-full">
                                    <div className="flex items-center gap-x-3">
                                        <h3 className="inline-block font-sans font-bold text-2xl truncate max-w-[calc(100%-23px)]">Jonathan Doe</h3>
                                        <RiVerifiedBadgeFill className="w-[20px] h-[20px] text-[var(--text-green)]/75" />
                                    </div>
                                    <span className="text-sm text-white/60">GreenLife Ltd.</span>
                                </div>      

                                <div className="flex items-center gap-x-4 z-10 relative max-md:w-full">
                                    <a href="#" className="p-2 rounded-[1] hover:bg-[var(--hover-bg)]" title="X handle">
                                        <BsTwitterX className="w-5 h-5 text-[rgba(255,255,255,0.9)]" />
                                    </a>

                                    <Copy text="https://localhost:3000/0.0.51426272" className="w-5 h-5" title="Copy profile url" />

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-3 py-5">

                        {/* <main className="w-full bg-[#181818] border border-[var(--border)] z-10 rounded-lg shadow-[var(--message-footer-card)]"> */}
                        <main className="w-full ">
                            <div className="w-full">
                                <div className="w-full overflow-x-auto small_scrollbar border-b border-b-[var(--border)] sticky top-[67px] right-0 z-8 bg-[#181818]">
                                    <div className="w-fit py-0 flex items-center gap-x-3 px-3 py-2 sm:px-4">
                                        <button className={`w-fit cursor-pointer max-[500px]:text-[13px] p-3 rounded-[5] ${route === "tokens_created" ? "bg-[var(--hover-bg)] text-white" : "text-white/80"}`}
                                        onClick={() => setRoute("tokens_created")}>Tokens Created</button>
                                        <button className={`w-fit cursor-pointer max-[500px]:text-[13px] p-3 rounded-[5] ${route === "tokens_bought" ? "bg-[var(--hover-bg)] text-white" : "text-white/80"}`}
                                        onClick={() => setRoute("tokens_bought")}>Tokens bought</button>
                                        <button className={`w-fit cursor-pointer max-[500px]:text-[13px] p-3 rounded-[5] ${route === "agent" ? "bg-[var(--hover-bg)] text-white" : "text-white/80"}`}
                                        onClick={() => setRoute("agent")}>Agent</button>
                                        <button className={`w-fit cursor-pointer max-[500px]:text-[13px] p-3 rounded-[5] ${route === "about" ? "bg-[var(--hover-bg)] text-white" : "text-white/80"}`}
                                        onClick={() => setRoute("about")}>About</button>
                                        <button className={`w-fit cursor-pointer max-[500px]:text-[13px] p-3 rounded-[5] ${route === "settings" ? "bg-[var(--hover-bg)] text-white" : "text-white/80"}`}
                                        onClick={() => setRoute("settings")}>Settings</button>
                                    </div>
                                </div>

                                <div className="w-full mt-4 overflow-x-hidden">
                                    <div className="w-full flex justify-center">
                                        <RoutePage />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}