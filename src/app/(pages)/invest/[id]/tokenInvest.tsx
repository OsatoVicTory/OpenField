"use client";

import Copy from "@/components/ui/copy";
import { Skeleton } from "@/components/ui/loading";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MdArrowUpward, MdGeneratingTokens, MdKeyboardArrowDown, MdOutlineCandlestickChart, MdOutlineShowChart, MdShowChart } from "react-icons/md";

export default function TokenInvest({ id } : { id: string }) {

    const [showSide, setShowSide] = useState(false);
    const [state, setState] = useState({ loading: true, error: false, tokensLoading: true, tokensError: false });
    const [token, setToken] = useState({ contract_address: "0x23467...21398" });
    const [showDropdown, setShowDropdown] = useState(false);
    const [orderType, setOrderType] = useState("limit");
    const [timeFrame, setTimeframe] = useState(0);

    useEffect(() => {
        const fn = () => {
            setTimeout(() => setState({ loading: false, error: false, tokensLoading: false, tokensError: false }), 3500);
        };
        fn();
    }, []);

    const color = "rgb(197,105,118)";
    const timeFrames = ["1 Hr", "4 Hr", "1 Day", "30 Day"];
    const orderTypes = ["limit", "market"];

    const timeframeFn = (i: number) => {
        setTimeframe(i);
    };

    const tokens = Array(6).fill(0).map((x, _tIdx) => ({ _id: _tIdx }));
    const tokensLoading = useMemo(() => Array(6).fill(0), [])

    return (
        <div className="w-full Token_Page min-h-[calc(100vh+140px)] mt-[-140px]">
            <div className="w-full flex flex-col lg:flex-row pt-[140px] relative">
                <div className={`absolute z-8 inset-0`} style={{ backgroundColor: color }}></div>
                <div className="size-full absolute z-8 inset-0">
                    <div className="tk_gradient absolute inset-0"></div>
                </div>
                <div className={`w-full lg:w-[calc(100%-270px)] xl:w-[calc(100%-330px)] z-9 ${showSide ? "max-lg:hidden" : ""}`}>
                    <div className="w-full py-6 px-4 sm:px-6 lg:px-7">
                        <div className="w-full flex justify-between items-start gap-x-2 max-xl:flex-col">
                            {
                                state.loading
                                ?
                                <div className="w-full flex flex-col gap-y-4">
                                    <div className="w-fit flex items-center gap-x-3">
                                        <Skeleton className="w-[60px] h-[60px] rounded-full" />
                                        <div className="">
                                            <div className="w-fit flex items-center font-medium">
                                                <Skeleton className="w-[240px] h-[36px] rounded-sm" />
                                            </div>
                                            <div className="w-fit flex text-xs text-white items-center gap-x-2 mt-2">
                                                <Skeleton className="w-[60px] h-[20px] rounded-sm" />
                                                <Skeleton className="w-[60px] h-[20px] rounded-sm" />
                                                <Skeleton className="w-[90px] h-[20px] rounded-sm" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex items-end w-fit gap-x-4 mt-2">
                                        <Skeleton className="w-[180px] h-[45px] rounded-sm" />
                                    </div>
                                    <Skeleton className="w-[210px] h-[20px] rounded-sm mt-1" />
                                </div>
                                :
                                <div className="w-full flex flex-col gap-y-3">
                                    <div className="w-fit flex items-center gap-x-3">
                                        <div className="w-[60px] h-[60px] rounded-full bg-white/75"></div>
                                        <div className="">
                                            <div className="w-fit flex sm:items-center font-medium max-sm:flex-col max-sm:gap-y-1">
                                                <h3 className="text-xl text-white">ABLG/AGR</h3>
                                                <span className="text-white/60 text-lg sm:ml-2 capitalize line-clamp-2">AirBnB lagos Nigeria</span>
                                            </div>
                                            <div className="w-fit flex text-xs max-[400px]:text-[11px] text-white items-center gap-x-2 mt-2">
                                                <div className="w-fit rounded-sm py-[3px] px-2 bg-[var(--frosted-bg)] border border-[var(--frosted-border)]">TOKEN</div>
                                                <div className="w-fit rounded-sm py-[3px] px-2 bg-[var(--frosted-bg)] max-[400px]:hidden border border-[var(--frosted-border)]">ABLG</div>
                                                <div className="w-fit flex items-center rounded-sm py-[4px] px-2 bg-[var(--frosted-bg)] border border-[var(--frosted-border)]">
                                                    <span className="text-inherit">0x23467...21398</span>
                                                    <Copy className="w-[15px] h-[15px] ml-[5px]" text={token.contract_address} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex items-end w-fit gap-x-4 mt-2">
                                        <h1 className="text-white text-4xl font-bold">$0.002728</h1>
                                        <div className={`flex items-center py-[3px] pl-[5px] pr-2 rounded-full text-[var(--text-green)] bg-[var(--text-green)]/20`}>
                                            <MdArrowUpward className="w-[15px] h-[18px]" />
                                            {/* <TiArrowDown className="text-[var(--text-green)] w-[15px] h-[15px]" /> */}
                                            <span className="font-medium text-sm">39%</span>
                                        </div>
                                    </div>
                                    <span className="text-[14px] text-white/60 mt-1">Oct 23, 2025, 5:30 PM</span>
                                </div>
                            }

                            <div className="flex w-fit items-center gap-x-3 mt-3">
                                <div className="w-fit relative">
                                    <button className={`${!state.loading && "cursor-pointer"} rounded-sm pl-3 pr-2 pt-1 pb-[7px] bg-[var(--frosted-bg)]/90 border border-[var(--frosted-border)]`}
                                    onClick={() => !state.loading && setShowDropdown(!showDropdown)}>
                                        <div className="flex font-medium items-center gap-x-1 text-[13px] text-white">
                                            <span className="opacity-[0.7]">Timeframe: </span>
                                            <span>1d</span>
                                            <MdKeyboardArrowDown className={`text-white w-[19px] h-[17px] transition-all duration-300 ease-in-out ${showDropdown ? "rotate-180" : "rotate-0"}`} />
                                        </div>
                                    </button>

                                    <div className={`dropdown-par dropdown dropdown_${showDropdown} flex flex-col gap-y-1 items-center w-[140px] rounded-sm absolute top-[120%] left-0 z-3 p-1 bg-[var(--frosted-bg)]/90 border border-[var(--frosted-border)]`}>
                                        {
                                            timeFrames.map((_frame, _fIdx) => (
                                                <button className={`cursor-pointer w-full text-start ${timeFrame === _fIdx ? "bg-[var(--hover-bg)]" : "hover:bg-[var(--hover-bg)]"} rounded-sm pl-3 pr-6 pt-1 pb-[7px] flex items-center`}
                                                onClick={() => !state.loading && timeframeFn(_fIdx)} key={`orders-type-${_fIdx}`}>
                                                    {_frame}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>

                                <button className={`${!state.loading && "cursor-pointer"} rounded-sm items-center flex px-2 py-[1px] ${true ? "border border-[var(--frosted-border)] bg-[var(--frosted-bg)]" : "hover:bg-[var(--frosted-bg)]"}`}>
                                    <MdShowChart className={`text-white opacity-[1] w-[23px] h-[29px]`} />
                                </button>
                                <button className={`${!state.loading && "cursor-pointer"} rounded-sm items-center flex py-[1px] px-2 ${false ? "border border-[var(--frosted-border)] bg-[var(--frosted-bg)]" : "hover:bg-[var(--frosted-bg)]"}`}>
                                    <MdOutlineCandlestickChart className={`text-white opacity-[1] w-[24px] h-[29px]`} />
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-[450px]"></div>
                    </div>
                </div>

                <div className={`w-full lg:w-[270px] xl:w-[330px] pl-2 pr-5 pt-6 z-8 ${!showSide ? "" : ""}`}>
                    <div className={`w-full flex flex-col gap-y-7 rounded-lg bg-[var(--frosted-bg)]/90 border border-[var(--frosted-border)]`}>
                        <div className="full flex items-center gap-x-3 px-3 py-5 border-b border-b-[var(--frosted-border)]">
                            {
                                orderTypes.map((_order, _orderIdx) => (
                                    <button className={`${!state.loading && "cursor-pointer"} text-xs ${orderType === _order ? `bg-[rgb(197,105,118)]/20` : ""} rounded-full items-center capitalize flex py-[4px] px-2`}
                                    onClick={() => !state.loading && setOrderType(_order)} key={`orders-type-${_orderIdx}`}>
                                        {_order}
                                    </button>
                                ))
                            }
                        </div>

                        {orderType === "limit" && <div className="w-full flex flex-col gap-y-4 px-3">
                            <label className="text-[13px] text-white/70">Order price</label>
                            <div className="inset-input w-full justify-between bg-[var(--hover-bg)] rounded-sm py-2 px-3 flex items-center text-white/75 text-sm">
                                <input className="w-[calc(100%-39px)] border-none bg-transparent outline-none text-inherit" placeholder="0.00" />
                                <span className="">ARBL</span>
                            </div>
                        </div>}

                        <div className="w-full flex flex-col gap-y-4 px-3">
                            <label className="text-[13px] text-white/70">Order value</label>
                            <div className="inset-input w-full justify-between bg-[var(--hover-bg)] rounded-sm py-2 px-3 flex items-center text-white/75 text-sm">
                                <input className="w-[calc(100%-39px)] border-none bg-transparent outline-none text-inherit" placeholder="0.00" />
                                <span className="">AGR</span>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-y-2 text-[13px] text-white px-3">
                            <div className="w-full flex justify-between items-center">
                                <span className="text-white/70">Qty</span>
                                <span className="text-white/70">10.00 ARBL</span>
                            </div>
                            <div className="w-full flex justify-between items-center">
                                <span className="text-white/70">Cost</span>
                                <span className="text-white/70">100.00 AGR</span>
                            </div>
                        </div>

                        <div className="w-full flex justify-between mt-3 gap-x-3 px-3 items-center text-center text-sm uppercase py-5 border-t border-t-[var(--frosted-border)]">
                            <button className={`flex w-1/2 font-bold uppercase ${state.loading ? "cursor-not-allowed" : "cursor-pointer"} justify-center items-center py-3 px-2 rounded-full text-[var(--text-green)] bg-[var(--text-green)]/20 hover:bg-[var(--text-green)]/30`}>Buy</button>
                            <button className={`flex w-1/2 font-bold uppercase ${state.loading ? "cursor-not-allowed" : "cursor-pointer"} justify-center items-center py-3 px-2 rounded-full text-[var(--text-red)] bg-[var(--text-red)]/20 hover:bg-[var(--text-red)]/30`}>Sell</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-hidden mt-8 px-6 pb-6">
                <div className="w-full flex justify-between items-center">
                    <div className="flex w-fit items-center gap-x-3">
                        <div className="w-fit flex items-center py-1 px-1 border border-[var(--frosted-border)] bg-white/6 rounded-sm">
                            <MdGeneratingTokens className="w-[21px] h-[19px] text-white/70" />
                        </div>
                        <h2 className="text-xl text-white font-bold">More Tokens</h2>
                    </div>
                    <Link href={`/invest`} className={`flex w-fit font-medium text-sm justify-center items-center py-1 px-3 rounded-sm text-white border border-[var(--border)] hover:bg-[var(--hover-bg)]`}>
                        View all
                    </Link>
                </div>
                <div className="w-full overflow-x-auto transparent-scrollbar mt-7">
                    <div className="flex items-center gap-x-6 w-fit pb-3">
                        {
                            state.tokensLoading ?
                            tokensLoading.map((_tokenL, _i) => (
                                <div className="w-fit" key={`more-tokens-${_i}`}>
                                    <div className="w-[270px] flex flex-col text-start justify-start items-start bg-[#282828]/20 border border-[var(--border)] rounded-lg px-4 py-4 gap-y-4">
                                        <Skeleton className="w-[45px] h-[45px] rounded-full" />
                                        
                                        <div className="w-full flex items-center">
                                            <Skeleton className="w-9/10 h-[17px] rounded-sm" />
                                        </div>

                                        <div className="flex items-end w-fit mt-0">
                                            <Skeleton className="w-[150px] h-[23px] rounded-sm" />
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            tokens.map((_token, _i) => (
                                <Link href={`/invest/${_token._id}`} className="w-fit" key={`more-tokens-${_i}`}>
                                    <div className="w-[270px] flex flex-col text-start justify-start items-start bg-[#282828]/20 border border-[var(--border)] rounded-lg px-4 py-4 gap-y-4">
                                        <div className="w-[45px] h-[45px] rounded-full bg-white/75"></div>
                                        
                                        <div className="w-full flex items-center font-medium">
                                            <span className="text-sm text-white">ABLG/AGR</span>
                                            <span className="text-white/60 text-xs ml-2 capitalize truncate">AirBnB lagos Nigeria</span>
                                        </div>

                                        <div className="flex items-end w-fit gap-x-3 mt-0">
                                            <h3 className="text-white text-xl font-bold">$0.002728</h3>
                                            <div className={`flex items-center py-[3px] pl-[5px] pr-2 rounded-full text-[var(--text-green)] bg-[var(--text-green)]/20`}>
                                                <MdArrowUpward className="w-[14px] h-[14px]" />
                                                {/* <TiArrowDown className="text-[var(--text-green)] w-[15px] h-[15px]" /> */}
                                                <span className="font-medium text-xs">39%</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}