"use client";

import { getTime } from "@/utils/helpers";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCheckmark, IoCheckmarkDone, IoSend } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { MdContentCopy, MdKeyboardArrowDown, MdOutlineStarBorder } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function P2PChat() {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [showEdit, setShowEdit] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [copied, setCopied] = useState(false);


    const accts = [
        {name: "Osato Victory", bank: "GTB Bank", number: "042517672"},
        {name: "Tory Etiosa", bank: "Wema Bank", number: "1042347672"},
        {name: "Greatest Ever", bank: "Zenith Bank", number: "000517354"},
    ];
    const [acct, setAcct] = useState(accts[0]);
    
    const vendor = {
        name: "Richy Boss", payment_duration: "30Min(s)", completed_orders: 2235, orders: 2240,
        limits: "10.000 - 50,000.000", quantity: "48,199.509 AGR", pos: 0,
        payments: ["First Bank", "GTB Bank (Guarantee Trust Bank)", "Kuda", "Opay", "Bank Transfer", "Palmpay"],
        instructions: `
            PLEASE READ ALL MY TRADE INSTRUCTION BEFORE OPENING TRADE\n
            OPENING TRADE MEANS YOU AGREE WITH MY TERMS AND CONDITIONS\n
            PAYING ONLY NGN (NIGERIAN BANKS), NOT USD\n
            *RATE IS 1350/$... RATE IS 1350/$... RATE IS 1350/$*\n
            I DON'T CANCEL TRADE NO MATTER WHAT\n 
            CONFIRM PAYMENT AND RELEASE COIN ON TIME\n
        `
    };

    const messages = [
        { sender: "vendor", time: Date.now() - 120000, img: "", text: `Good day` },
        { sender: "vendor", time: Date.now() - 120000, img: "", text: `Are you online and should I send ?` },
        { sender: "You", time: Date.now() - 60000, img: "", text: `Yes I am online` },
        { sender: "You", time: Date.now() - 60000, img: "", text: `Send payment confirmation so I can release coins to you` },
        { sender: "vendor", time: Date.now(), img: "true", text: `Payment made` },
        { sender: "vendor", time: Date.now(), img: "", text: `Please confirm payment and release coin` },
    ];

    return (
        <div className="w-full flex flex-col h-full">
            <header className="w-full p-3 flex justify-between items-center bg-[var(--dark-black-bg)]/55 z-1 border-b border-b-[var(--border)]">
                <div className="flex items-center w-fit gap-x-3">
                    <div className="rounded-full flex items-center justify-center font-medium text-lg w-[40px] h-[40px] bg-[var(--primary)]">{vendor.name[0]}</div>
                    <div className="flex flex-col gap-y-0">
                        <span className="text-sm font-medium text-white">{vendor.name}</span>
                        <span className="text-xs text-white/50 mt-[2px]">Online</span>
                    </div>
                </div>
                <button className="w-fit p-2 rounded-sm hover:bg-[var(--hover-bg)] cursor-pointer">
                    {/* MdOutlineStartPurple500 for filled star */}
                    <MdOutlineStarBorder className="w-[25px] h-[25px] text-white/85" />
                </button>
            </header>
            <main className="flex-1 w-full z-1 overflow-y-auto px-3 lg:px-8 py-4">
                <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-y-4 w-[450px] max-w-full md:max-w-85/100">

                        {!initialized && <h3 className="py-2 text-md text-white/75 text-center">Trade Details and Instructions</h3>}

                        <div className="w-full flex flex-col p-3 gap-y-3 bg-[#282828]/20 border border-[var(--border)] rounded-lg">
                            {initialized ?
                                <div className="flex w-full items-center gap-x-3 pb-2 px-2 border-b border-b-[rgb(38,39,45)]">
                                    <span className="w-fit text-white/90 font-medium text-xl">0.00</span>
                                    <span className="text-white font-medium text-xs">AGR</span>
                                </div>
                                :
                                <div className="flex w-full items-center gap-x-3 border-b border-b-[rgb(38,39,45)]">
                                    <input className="w-[calc(100%-100px)] p-2 font-medium text-xl border-none outline-none bg-none" placeholder="0" />
                                    <div className="flex w-fit text-sm items-center gap-x-2">
                                        <span className="text-white font-medium">AGR</span>
                                        <span className="text-white/50">|</span>
                                        <button className="text-[var(--primary)] text-md font-medium cursor-pointer">Max</button>
                                    </div>
                                </div>
                            }
                            <div className="flex w-full flex-col gap-y-2 text-xs py-1">
                                <div className="flex items-center gap-x-1">
                                    <span className="text-white/50">
                                        {!initialized ? `Limits: ${vendor.limits} AGR` : `Bank / Chain: ${acct.bank}`}
                                    </span>
                                </div>
                                {initialized && <div className="flex items-center gap-x-1">
                                    <span className="text-white/50">Account Name: {acct.name}</span>
                                </div>}
                                
                                <div className="flex items-center gap-x-1">
                                    <span className="text-white/50">{!initialized ? `Balance: 10.000 AGR` : `Number/Address: ${acct.number}`}</span>
                                    {initialized && <>
                                        {!copied 
                                            ? 
                                            <MdContentCopy className="cursor-pointer w-[15px] h-[15px] text-[rgba(255,255,255,0.6)] ml-[5px]"
                                            onClick={async () => {
                                                try {
                                                    await navigator.clipboard.writeText(acct.number);
                                                    setCopied(true);
                                                    setTimeout(() => setCopied(false), 2000);
                                                } catch (err) {
                                                    // 
                                                }
                                            }} /> 
                                            : 
                                            <FaCheck className="w-[14px] h-[14px] text-[rgba(68,231,68,0.85)] ml-[5px]" />
                                        }
                                    </>}
                                </div>
                            </div>
                        </div>

                        {initialized && <div className="w-full flex justify-between p-3 items-center bg-[#282828]/20 border border-[var(--border)] rounded-xl">
                            <h1 className="text-xl font-bold text-white">15:00</h1>
                            <span className="text-xs text-white/45">Countdown</span>
                        </div>}

                        {!initialized && <div className="w-full flex flex-col justify-center bg-[#282828]/20 border border-[var(--border)] rounded-xl">
                            <div className="flex justify-between items-center border-b border-b-[rgb(38,39,45)] p-3">
                                <div className="w-fit flex items-center gap-x-1">
                                    <div className="w-[3px] h-[12px] bg-[orange]/85"></div>
                                    <span className="text-xs text-white">{`${acct.bank} - ${acct.number}`}</span>
                                </div>
                                <button className="p-1 cursor-pointer flex items-center justify-center hover:opacity-[0.7]"
                                onClick={() => setShowEdit(!showEdit)}>
                                    <IoMdArrowDropdown className={`w-[17px] h-[18px] text-white/75 transition-all duration-300 ease-in-out ${showEdit && "rotate-180"}`} />
                                </button>
                            </div>
                            {showEdit && <div className="flex justify-between items-center pt-3 pb-1 px-3">
                                <div className="gap-x-2 border border-[var(--border)] text-xs font-medium w-full p-2 text-[var(--text-grey)] rounded-md">
                                    {accts.map((_acct, a_idx) => (
                                        <div className="flex items-center p-2 justify-between w-full border-b border-b-[var(--border)] last:border-b-0" key={`acct-${a_idx}`}>
                                            <div className="text-inherit w-[calc(100%-50px)] truncate">
                                                {`${_acct.bank} - ${_acct.number}`}
                                            </div>
                                            <span className="text-white/50">|</span>
                                            <button className="text-[var(--primary)] text-xs font-medium cursor-pointer"
                                            onClick={() => setAcct(_acct)}>Set</button>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                            <div className="flex justify-between items-center py-4 px-3">
                                <span className="text-xs text-white/50">Payment Duration</span>
                                <span className="text-xs text-white">{vendor.payment_duration}</span>
                            </div>
                        </div>}

                        {!initialized && <div className="flex flex-col w-full">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center w-fit gap-x-2">
                                    <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center bg-[var(--primary)] text-black text-sm font-medium">
                                        {vendor?.name[0] || "U"}
                                    </div>
                                    <span className="text-xs font-medium">{vendor.name}</span>
                                    <RiVerifiedBadgeFill className="w-[15px] h-[15px] text-[var(--primary-light)]" />
                                </div>
                            </div>
                            <div className="flex items-center text-[11px] text-white/50 gap-x-1 w-fit mt-2">
                                <span className="">{`Orders ${vendor.completed_orders}`}</span>
                                <span className="">{`Completion Rate ${Math.floor((vendor.completed_orders / vendor.orders) * 100)} %`}</span>
                            </div>
                        </div>}
                        {!initialized && <div className="flex flex-col">
                            <span className="text-xs text-white/50">
                                {vendor.instructions}
                            </span>
                        </div>}

                        {!initialized && <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col">
                                <div className="flex items-center w-fit text-white gap-x-1">
                                    <span className="text-lg">0</span>
                                    <span className="text-[11px]">AGR</span>
                                </div>
                                <span className="text-[11px] text-white/50">Total Payable</span>
                            </div>
                            <button className="py-2 px-6 rounded-full bg-[var(--primary)] font-medium text-sm text-black/75"
                            onClick={() => setInitialized(true)}>Sell</button>
                        </div>}
                    </div>
                </div>

                {/* full chat list here now */}
                <ul className="w-full h-fit list-none mt-8">
                    {messages.map((message, index) => (
                        <li className="w-full" key={`chat-${index}`}>  
                            <div className={`relative w-full mt-3 chat_box true ${message.sender === "You" ? "by_you" : "by_others"} flex justify-end`}>
                                <div className="z-1 w-max max-w-80/100 bg-[var(--message-bg)] shadow-[var(--message-card)] mr-[2px] p-[6px] rounded-[10]">
                                    {/* <div className="w-full relative w-full flex">
                                        <div className="z-3 absolute right-0 top-0 p-[2px] rounded-tr-[10] flex w-fit h-fit bg-[var(--shadow-bg)] cursor-pointer">
                                            <MdKeyboardArrowDown className="text-white w-6 h-6" />
                                        </div>
                                    </div> */}

                                    {message.img && <div className="w-[240px] lg:w-[300px] max-w-full bg-white/95 h-[270px] rounded-[3]"></div>}

                                    <div className={`flex flex-col ${message.img ? "mt-2 max-w-[270px] lg:max-w-[330px]" : ""}`}>
                                        <span className={`pt-0 px-[5px] text-sm max-[390px]:text-[13px]`}>
                                            <span className={`w-fit max-w-full`}>{message.text}</span>
                                            
                                            <span className="inline-flex items-center h-0 w-fit opacity-0 overflow-y-hidden">
                                                <span className="text-[var(--text-grey)]/80 text-[13px] leading-0">{getTime(message.time)}</span>
                                                <IoCheckmarkDone className="text-[var(--text-grey)]/80 w-4 h-0 ml-[5px]" />
                                                {/* <IoCheckmark className="text-[var(--text-grey)]/80 w-3 h-3" /> */}
                                            </span>
                                        </span>
                                        <span className="inline-flex items-center justify-end">
                                            <span className="mt-[-14px] inline-flex items-center">
                                                <span className="text-[var(--text-grey)]/80 text-[12px] max-[390px]:text-[11px]">{getTime(message.time)}</span>
                                                <IoCheckmarkDone className={`text-[var(--text-grey)]/80 w-4 h-4 ml-[5px]`} />
                                                {/* <IoCheckmark className="text-[var(--text-grey)]/80 w-3 h-3" /> */}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            </main>
            <footer className="w-full p-3">
                <div className="flex flex-row w-full items-center gap-x-3 rounded-full justify-between p-2 bg-[#242626] shadow-[var(--message-footer-card)]">
                    <button className="p-2 rounded-full hover:bg-[var(--hover-bg)] cursor-pointer">
                        <LuImagePlus className="text-white w-5 h-5" />
                    </button>
                    <div className="grow-1 flex items-center h-fit">
                        <textarea id="type-textarea" className="w-full text-sm field-sizing-content h-fit resize-none border-none outline-none bg-transparent min-h-[23px] max-h-[100px]" placeholder="Type a message"></textarea>
                    </div>
                    <button className="p-2 flex items-center justify-center rounded-full bg-[var(--primary-light)] cursor-pointer">
                        <IoSend className="text-black w-5 h-5" />
                    </button>
                </div>
            </footer>
        </div>
    )
}