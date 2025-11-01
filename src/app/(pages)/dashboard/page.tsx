"use client";

import { Skeleton } from "@/components/ui/loading";
import { useEffect, useMemo, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function Dashboard() {

    const [cardDataLoading, setCardDataLoading] = useState(true);

    useEffect(() => {
        const fn = () => setTimeout(() => setCardDataLoading(false), 5000);
        fn();
    }, []);

    const skeletonCardArr = useMemo(() => Array(4).fill(0), []);
    const cardArr = [
        { name: "Active Investments", value: "10", icon: FiTrendingUp},
        { name: "Assets Tokenized", value: "3", icon: MdOutlineGeneratingTokens},
        { name: "Loan Balance", value: "30.00", icon: LiaMoneyCheckAltSolid, tk: "$AGR"},
        { name: "Wallet Balance", value: "100.00", icon: RiMoneyDollarCircleLine, tk: "$AGR"},
    ]

    return (
        <div className="w-full px-6 pt-3">
            <h1 className="text-white/93 text-2xl font-bold max-w-full md:hidden">{`Welcome back, Tory 👋`}</h1>
            <div className="flex justify-between items-center py-3 px-1 mt-2 md:mt-0">
                <h2 className="text-2xl md:text-3xl font-bold">Overview</h2>
                <button className="bg-[var(--primary)] rounded-full py-2 px-3 pr-4 flex items-center">
                    <MdOutlineGeneratingTokens className="text-white w-[21px] h-[21px]" />
                    <span className="text-sm text-white ml-[8px]">Tokenize Asset</span>
                </button>
            </div>
            <div className="py-3 px-1 mt-3 w-full overflow-x-auto transparent-scrollbar">
                <div className="w-fit flex justify-between items-center"></div>
                {
                    cardDataLoading 
                    ?
                    <div className="w-fit min-[1300px]:w-full flex justify-between gap-x-4 pb-[10px]">
                
                        {skeletonCardArr.map((_, index) => (
                            <div key={`cardSkeleton-${index}`}
                            className="flex flex-col justify-between items-start relative bg-[#282828]/20 border border-[var(--border)] rounded-lg p-4 pl-5 py-8 gap-2 w-[280px] min-[1300px]:w-24/100">
                                <div className="flex w-fit items-center gap-x-5">
                                    <div className="w-fit h-fit">
                                        <Skeleton className="w-[33px] h-[35px] rounded-[6]" />
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex flex-row justify-between items-center w-[130px]">
                                            <Skeleton className="w-full h-[24px] rounded-[10]" />
                                        </div>
                                        <div className="flex flex-row items-center gap-1 w-[150px]">
                                            <Skeleton className="w-full h-[33px] rounded-[8]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    :
                    <div className="w-fit min-[1300px]:w-full flex justify-between gap-x-4 pb-[10px]">

                        {cardArr.map((card, index) => (
                            <button key={`card-${index}`}
                            className="cursor-pointer flex flex-col text-start justify-start items-start relative bg-[#282828]/20 border border-[var(--border)] rounded-lg px-4 pl-5 py-8 gap-2 w-[280px] min-[1300px]:w-24/100">
                                <div className="flex w-fit items-center gap-x-6">
                                    <card.icon className="text-white w-[30px] h-[40px]" />
                                    <div className="flex flex-col gap-y-2">
                                        <span className="text-sm text-white/85">{card.name}</span>
                                        <span className="">
                                            <span className="text-3xl font-bold">{card.value}</span> 
                                            <span className="text-md text-white/75 font-medium ml-2 mb-[1px]">{card.tk||""}</span>
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                         
                    </div>
                }
            </div>

            <section className="w-full flex justify-between items-center mt-6 flex-col gap-y-6 lg:flex-row">
                <div className="bg-[var(--secondary3)]/20 border border-[var(--border)] rounded-md p-6 w-full lg:w-[calc(50%-10px)] h-[330px]">
                    <h2 className="text-xl font-bold mb-4">Storage Usage Over Time</h2>
                    {/* <BarChart /> */}
                </div>

                <div className="bg-[var(--secondary3)]/20 border border-[var(--border)] rounded-md p-6 w-full lg:w-[calc(50%-10px)] h-[330px]">
                    <h2 className="text-xl font-bold mb-3">Recent Activities</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                            <div>
                                <p className="font-medium">Asset Tokenized on chain</p>
                                <p className="text-sm mt-1 text-white/60 md:max-w-full max-w-[180px] truncate">New asset &quot;Green Farms&quot; was tokenized</p>
                            </div>
                            <span className="text-sm text-white/60">2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                            <div>
                                <p className="font-medium">Asset Added</p>
                                <p className="text-sm mt-1 text-white/60 md:max-w-full max-w-[180px] truncate">Green Farms was added to assets</p>
                            </div>
                            <span className="text-sm text-white/60">3 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <div>
                                <p className="font-medium">Payment Processed</p>
                                <p className="text-sm mt-1 text-white/60  md:max-w-full max-w-[180px] truncate">Loan payment completed</p>
                            </div>
                            <span className="text-sm text-white/60">1 day ago</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full flex justify-between items-center mt-6 flex-col lg:flex-row">
                <div className="bg-[var(--secondary3)]/20 border border-[var(--border)] rounded-xl p-4 w-full">
                    <div className="w-full justify-between items-center flex">
                        <h2 className="text-xl font-bold mb-4">Your Assets</h2>
                        <button>View All</button>
                    </div>
                </div>
            </section>

        </div>
    )
}