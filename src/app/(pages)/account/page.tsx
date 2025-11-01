"use client";

import AccountSettings from "@/components/dashboard/accountSettings";
import AccountTokens from "@/components/dashboard/accountTokens";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function Account() {

    const [route, setRoute] = useState("tokens");

    return (
        <div className="w-full h-full Account">
            <div className="w-full Token_Page mt-[-80px]">
                <div className="w-full h-[330px] relative">
                    <div className="w-full h-full bg-[var(--primary-light)]"></div>
                    <div className="size-full tk_gradient_low absolute inset-0"></div>
                </div>

                <div className="w-full flex md:justify-between md:gap-x-8 text-white px-10 mt-[-100px] bg-[#121212] pb-6">
                    <aside className="w-full md:w-[300px] h-fit rounded-lg bg-[#181818] border border-[var(--border)] sticky top-[72px] left-0 z-10 shadow-[var(--message-footer-card)]">
                        <div className="py-5">
                            <div className="w-full px-3 pt-4 pb-7 flex flex-col items-center border-b border-b-[rgb(38,39,45)]">
                                <div className="w-[120px] h-[120px] rounded-full bg-white/60"></div>
                                <div className="flex flex-col items-center gap-y-1 mt-4">
                                    <h3 className="font-bold text-xl">Jonathan Doe</h3>
                                    <span className="text-sm text-white/60">GreenLife Ltd.</span>
                                </div>
                            </div>
                            <div className="w-full border-b border-b-[var(--border)] py-3 px-5 flex justify-between items-center">
                                <span className="text-sm">Asset Tokens</span>
                                <span className="text-lg font-medium">5</span>
                            </div>
                            <div className="w-full border-b border-b-[var(--border)] py-3 px-5 flex justify-between items-center">
                                <span className="text-sm">Tokens Created</span>
                                <span className="text-lg font-medium">20</span>
                            </div>
                            <div className="w-full border-b border-b-[var(--border)] py-3 px-5 flex justify-between items-center">
                                <span className="text-sm">Verified</span>
                                <RiVerifiedBadgeFill className="w-[19px] h-[19px] text-[var(--text-green)]/75" />
                            </div>
                            <div className="w-fit max-w-full py-3 px-3 mt-3">
                                <div className="w-full border border-white/24 p-3 rounded-sm flex gap-x-4">
                                    <span className="text-[13px] truncate text-white/75">https://localhost:3000/0.0.51426272</span>
                                    <MdContentCopy className="w-[19px] h-[19px] text-white/60" />
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="w-full md:w-[calc(100%-310px)] bg-[#181818] border border-[var(--border)] z-10 rounded-lg shadow-[var(--message-footer-card)]">
                        <div className="w-full">
                            <div className="py-0 border-b border-b-[var(--border)] flex items-center gap-x-3 px-4 sticky top-[68px] right-0 z-8 bg-[#181818]">
                                <button className={`w-fit cursor-pointer px-3 pt-4 pb-3 border-b-[5px] ${route === "tokens" ? "border-b-[var(--primary)] text-white" : "text-white/80 border-b-transparent"}`}
                                onClick={() => setRoute("tokens")}>Tokens Created</button>
                                <button className={`w-fit cursor-pointer px-3 pt-4 pb-3 border-b-[5px] ${route === "about" ? "border-b-[var(--primary)] text-white" : "text-white/80 border-b-transparent"}`}
                                onClick={() => setRoute("about")}>About</button>
                                <button className={`w-fit cursor-pointer px-3 pb-3 pt-4 border-b-[5px] ${route === "settings" ? "border-b-[var(--primary)] text-white" : "text-white/80 border-b-transparent"}`}
                                onClick={() => setRoute("settings")}>Settings</button>
                            </div>

                            <div className="w-full mt-4 overflow-x-hidden">
                                <div className="w-full">
                                    {
                                        route === "tokens"
                                        ?
                                        <AccountTokens />
                                        :
                                        (
                                            route === "about"
                                            ?
                                            <div className="w-full"><h1>About Page</h1></div>
                                            :
                                            <AccountSettings />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}