"use client";

import LoanModal from "@/components/modals/loanModal";
import { Skeleton } from "@/components/ui/loading";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdAddCircleOutline } from "react-icons/md";

export default function Loans() {

    const [state, setState] = useState({ loading: true, error: false });
    const [loans, setLoans] = useState(Array(15).fill(0));
    const scrollDriverRef = useRef<HTMLDivElement | null>(null);
    const scrollDrivenRef = useRef<HTMLDivElement | null>(null); 
    const [loan, setLoan] = useState<string | null>(null);

    useEffect(() => {
        const scrollDriver = scrollDriverRef.current;
        const scrollDriven = scrollDrivenRef.current;

        const fn = () => setTimeout(() => {
            setState({ loading: false, error: false });
        }, 5000);
        fn();

        const handleScroll = () => {
            if(scrollDriven && scrollDriver && scrollDriven.scrollLeft !== scrollDriver.scrollLeft) {
                scrollDriven.scrollLeft = scrollDriver.scrollLeft;
            }
        };

        if(scrollDriven && scrollDriver) {
            scrollDriver.addEventListener("scroll", handleScroll);
        }

        return () => {
            if(scrollDriven && scrollDriver) {
                scrollDriver.removeEventListener("scroll", handleScroll);
            }
        };

    }, []);

    const loansLoadingArr = useMemo(() => Array(15).fill(0), []);

    return (
        <div className="w-full pt-2 px-1 pb-4 bg-[#121212] min-h-[calc(100vh-70px)]">
            <div className="w-full sticky top-[68px] bg-[#121212] right-0 z-8 pt-2 px-5 border-b border-b-[var(--border)]">
                <h1 className="text-white/93 text-xl sm:text-2xl mt-3 font-bold max-w-full md:hidden">{`Welcome back, Tory 👋`}</h1>
                <div className="flex justify-between items-center py-3 px-1 mt-2 md:mt-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Loans History</h2>
                    <Link href={"/loan/create"} className="bg-[var(--primary)] rounded-full py-2 px-3 pr-4 flex items-center">
                        <MdAddCircleOutline className="text-white w-[21px] h-[21px]" />
                        <span className="text-sm text-white ml-[8px]">New Loan</span>
                    </Link>
                </div>

                <div className="w-full overflow-x-auto hide_scrollbar mt-2" ref={scrollDrivenRef}>
                    <div className="w-fit min-w-full xl:w-full">
                        <header className={`w-full flex text-xs justify-between items-center font-medium text-white/60 pl-2 pr-6 py-1 `}>
                            <div className={`flex items-center bg-[#121212] pl-4 pr-3 gap-x-3 h-[39px] sticky left-0 z-5 w-[170px] sm:w-[220px] md:w-[250px] xl:w-[270px]`}>
                                <span></span>
                                <span>LOAN ID</span>
                            </div>

                            <div className={`flex justify-end items-center w-[110px] text-inherit`}>LOAN AMOUNT</div>
                            <div className={`flex justify-end items-center w-[110px] text-inherit`}>APPLIED ON</div>
                            <div className={`flex justify-end items-center w-[110px] text-inherit`}>STARTED ON</div>
                            <div className={`flex justify-end items-center w-[110px] text-inherit`}>DURATION</div>
                            <div className={`flex justify-end items-center w-[110px] text-inherit`}>AMOUNT/MONTH</div>
                            <div className={`flex justify-end items-center w-[90px] text-inherit`}>INTEREST</div>
                        </header>
                    </div>
                </div>
            </div>
            
            <div className="Tokens_Table w-full overflow-x-auto pr-3" ref={scrollDriverRef}>
                <div className="w-fit min-w-full xl:w-full">

                    <div className="w-full CT_Ul">
                        {
                            state.loading 
                            ?
                            loansLoadingArr.map((_, _lIdx) => (
                                <div key={`items-loansLoadingArr-${_lIdx}`}
                                className={`w-full text-sm flex justify-between font-medium items-center pl-2 pr-6 py-3 border-b border-b-[var(--border)] `}>
                                    <div className={`text-white bg-inherit flex items-center pl-4 pr-3 h-[39px] sticky left-0 z-5 w-[170px] sm:w-[220px] md:w-[250px] xl:w-[270px]`}>
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
                                    <button key={`items-${loan._id}-${index}`} onClick={() => setLoan("Loan")}
                                    className={`w-full cursor-pointer token_list_div flex justify-between font-medium items-center pl-2 pr-6 py-3 not-last:border-b border-b-[var(--border)] `}>
                                        <div className={`text-white gap-x-2 token_list_div_first flex items-center pl-4 pr-3 h-[39px] sticky left-0 z-5 w-[170px] sm:w-[220px] md:w-[250px] xl:w-[270px]`}>
                                            <GoDotFill className="w-[13px] h-[12px] text-white/75" />
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

                                    </button>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>

            {loan && <div className="fixed w-full h-full bg-[rgba(18,18,18,0.81)] z-18 top-0 left-0"></div>}

            <LoanModal loan={loan} closeFn={() => setLoan(null)} />
        </div>
    )
}