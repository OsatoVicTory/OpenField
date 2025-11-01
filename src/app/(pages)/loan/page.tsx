"use client";

import { Skeleton } from "@/components/ui/loading";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdAddCircleOutline, MdOutlineVerifiedUser } from "react-icons/md";
import { RiMoneyDollarCircleLine, RiProgress6Line } from "react-icons/ri";

export default function Loan() {

    const [cardDataLoading, setCardDataLoading] = useState(true);
    const [state, setState] = useState({ loading: true, error: false });
    const [loans, setLoans] = useState(Array(6).fill(0));

    useEffect(() => {
        const fn = () => setTimeout(() => {
            setCardDataLoading(false);
            setState({ loading: false, error: false });
        }, 5000);
        fn();
    }, []);

    const skeletonCardArr = useMemo(() => Array(4).fill(0), []);
    const cardArr = [
        { name: "Approved Loans", value: "10", icon: MdOutlineVerifiedUser},
        { name: "Loan In-progress", value: "3", icon: RiProgress6Line},
        { name: "Total Paid", value: "130.00K", icon: LiaMoneyCheckAltSolid, tk: "$AGR"},
        { name: "Loan Balance", value: "30.00K", icon: RiMoneyDollarCircleLine, tk: "$AGR"},
    ];

    const loansLoadingArr = useMemo(() => Array(6).fill(0), []);

    return (
        <div className="w-full px-3 sm:px-4 md:px-6 pt-3 pb-5">
            <h1 className="text-white/93 text-xl sm:text-2xl mt-3 font-bold max-w-full md:hidden">{`Welcome back, Tory 👋`}</h1>
            <div className="flex justify-between items-center py-3 px-1 mt-2 md:mt-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Overview</h2>
                <Link href={"/loan/create"} className="bg-[var(--primary)] rounded-full py-2 px-3 pr-4 flex items-center">
                    <MdAddCircleOutline className="text-white w-[21px] h-[21px]" />
                    <span className="text-sm text-white ml-[8px]">New Loan</span>
                </Link>
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
                            <div key={`card-${index}`}
                            className="flex flex-col text-start justify-start items-start relative bg-[#282828]/20 border border-[var(--border)] rounded-lg px-4 pl-5 py-8 gap-2 w-[280px] max-[400px]:w-[250px] min-[1300px]:w-24/100">
                                <div className="flex w-fit items-center gap-x-5">
                                    <card.icon className="text-white w-[30px] h-[40px]" />
                                    <div className="flex flex-col gap-y-2">
                                        <span className="text-sm text-white/85">{card.name}</span>
                                        <span className="">
                                            <span className="text-3xl max-[400px]:text-2xl font-bold">{card.value}</span> 
                                            <span className="text-md max-[400px]:text-sm text-white/75 font-medium ml-2 mb-[1px]">{card.tk||""}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                         
                    </div>
                }
            </div>

            <section className="w-full flex justify-between items-center mt-6 flex-col bg-[#121212] border border-[var(--border)] rounded-lg">
                <div className="border-b border-b-[var(--border)] p-4 py-5 w-full">
                    <div className="w-full justify-between items-center flex">
                        <h2 className="text-lg sm:text-xl font-bold">Your Loans</h2>
                        <Link href={`/loan/history`} className={`flex w-fit font-medium text-sm justify-center items-center py-1 px-3 rounded-sm text-white border border-[var(--border)] hover:bg-[var(--hover-bg)]`}>
                            View all
                        </Link>
                    </div>
                </div>

                <div className="w-full mt-0">
                    <div className="w-full overflow-x-auto py-2">
                        <div className="w-fit min-w-full xl:w-full">
                            <header className={`w-full token_list_div flex text-xs justify-between gap-x-3 items-center font-medium text-white/60 pl-2 pr-6 py-1 border-b border-b-[var(--border)] `}>
                                <div className={`flex token_list_div_first items-center bg-[#121212] pl-4 pr-3 gap-x-2 h-[39px] sticky left-0 z-5 w-[170px] sm:w-[220px] md:w-[250px] xl:w-[270px]`}>
                                    <span>S/N</span>
                                    <span>LOAN ID</span>
                                </div>

                                <div className={`flex justify-end items-center w-[110px] text-inherit`}>LOAN AMOUNT</div>
                                <div className={`flex justify-end items-center w-[110px] text-inherit`}>APPLIED ON</div>
                                <div className={`flex justify-end items-center w-[110px] text-inherit`}>STARTED ON</div>
                                <div className={`flex justify-end items-center w-[110px] text-inherit`}>DURATION</div>
                                <div className={`flex justify-end items-center w-[110px] text-inherit`}>AMOUNT/MONTH</div>
                                <div className={`flex justify-end items-center w-[90px] text-inherit`}>INTEREST</div>
                            </header>

                            <div className="w-full CT_Ul">
                                {
                                    state.loading 
                                    ?
                                    loansLoadingArr.map((_, _lIdx) => (
                                        <div key={`items-loansLoadingArr-${_lIdx}`}
                                        className={`w-full token_list_div text-sm flex justify-between gap-x-3 font-medium items-center pl-2 pr-6 py-3 border-b border-b-[var(--border)] `}>
                                            <div className={`text-white token_list_div_first bg-inherit flex items-center pl-4 pr-3 h-[39px] sticky left-0 z-5 w-[170px] sm:w-[220px] md:w-[250px] xl:w-[270px]`}>
                                                <Skeleton className="w-full h-[18px] rounded-sm" />
                                            </div>

                                            <div className={`flex justify-end items-center w-[110px] text-inherit text-sm gap-x-2`}>
                                                <Skeleton className="w-full h-[18px] rounded-sm" />
                                            </div>
                                            <div className={`flex justify-end items-center w-[110px] text-inherit text-sm`}>
                                                <Skeleton className="w-full h-[18px] rounded-sm" />
                                            </div>
                                            <div className={`flex justify-end items-center w-[110px] text-inherit text-sm`}>
                                                <Skeleton className="w-full h-[18px] rounded-sm" />
                                            </div>
                                            <div className={`flex justify-end items-center w-[110px] text-inherit text-sm`}>
                                                <Skeleton className="w-full h-[18px] rounded-sm" />
                                            </div>

                                            <div className={`flex justify-end items-center w-[110px] text-inherit text-sm gap-x-2`}>
                                                <Skeleton className="w-full h-[18px] rounded-sm" />
                                            </div>

                                            <div className={`flex justify-end items-center w-[90px] text-inherit text-sm gap-x-2`}>
                                                <Skeleton className="w-full h-[18px] rounded-sm" />
                                            </div>
                                        </div>
                                    ))
                                    :
                                    (
                                        loans.length === 0 ?
                                        <div className="w-full flex items-center justify-center">
                                            <span className="text-white/70 p-5 capitalize">No data to display</span>
                                        </div>
                                        :
                                        loans.map((loan, index: number) => (
                                            // check global.css, there is something we did for token_list_div and _first
                                            <div key={`items-${loan._id}-${index}`}
                                            className={`w-full token_list_div gap-x-3 flex justify-between font-medium items-center pl-2 pr-6 py-3 not-last:border-b border-b-[var(--border)] `}>
                                                <div className={`text-white gap-x-4 token_list_div_first flex items-center pl-4 pr-3 h-[39px] sticky left-0 z-5 w-[170px] sm:w-[220px] md:w-[250px] xl:w-[270px]`}>
                                                    <span className="text-sm text-white/60">{index}</span>
                                                    <span className="text-sm capitalize truncate ml-1">10134983634</span>
                                                </div>

                                                <div className={`flex justify-end items-center w-[110px] text-inherit text-sm gap-x-2`}>
                                                    <span className="" title="345690.45">345.69K</span>
                                                    <span className="text-white/36">AGR</span>
                                                </div>

                                                <div className={`flex justify-end items-center w-[110px] text-inherit text-sm gap-x-2`}>
                                                    <span className="">14/10/2025</span>
                                                </div>

                                                <div className={`flex justify-end items-center w-[110px] text-inherit text-sm gap-x-2`}>
                                                    <span className="">24/10/2025</span>
                                                </div>

                                                <div className={`flex justify-end items-center w-[110px] text-inherit text-sm gap-x-2`}>
                                                    <span className="capitalize">3 Years</span>
                                                </div>

                                                <div className={`flex justify-end items-center w-[110px] text-inherit text-sm gap-x-2`}>
                                                    <span className="" title="1,120.36">1.12K</span>
                                                    <span className="text-white/36">AGR</span>
                                                </div>

                                                <div className={`flex justify-end items-center w-[90px] text-inherit text-sm gap-x-2`}>
                                                    <span className="">33%</span>
                                                </div>

                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}