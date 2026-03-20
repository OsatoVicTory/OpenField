"use client";

import Link from "next/link";
import { Skeleton } from "../ui/loading";
import { useEffect, useMemo, useRef, useState } from "react";

export default function AccountTokens() {
    
    const [state, setState] = useState({ loading: true, error: false });

    const [tokens, setTokens] = useState(Array(2).fill(0). map((_, i) => {
        const mul = (i && i%3 === 0) ? -1.0 : 1.0;
        return { _id: i, one_hr_change: 3.21 * mul, one_day_change: 41.87 * mul, thirty_day_change: 125.89 * mul };
    }));

    const scrollDriverRef = useRef<HTMLDivElement | null>(null);
    const scrollDrivenRef = useRef<HTMLDivElement | null>(null); 

    useEffect(() => {
        const scrollDriver = scrollDriverRef.current;
        const scrollDriven = scrollDrivenRef.current;

        const fn = () => {
            setTimeout(() => setState({ loading: false, error: false }), 3500);
        };
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

    const tokensLoadingArr = useMemo(() => Array(12).fill(0), []);

    return (
        <div className="w-full" id="tokens">
            
            <div className="Tokens_Table w-full overflow-x-auto hide_scrollbar" ref={scrollDrivenRef}>
                <div className="w-fit min-w-full xl:w-full">
                    <header className={`w-full flex justify-between gap-x-4 items-center font-medium text-white/60 pl-2 pr-6 sticky top-0 right-0 z-9 py-1 border-b border-b-[var(--border)] `}>
                        <div className={`flex items-center token_list_div_first w-[250px] pl-5 pr-3 gap-x-2 h-[39px] sticky left-0 z-1 text-xs xl:w-[270px] max-[500px]:w-[220px]`}>TOKENS</div>

                        <div className={`flex justify-end itmes-center w-[100px] text-inherit text-xs`}>PRICE</div>
                        <div className={`flex justify-end itmes-center w-[90px] text-inherit text-xs`}>1H CHANGE</div>
                        <div className={`flex justify-end itmes-center w-[90px] text-inherit text-xs`}>1D CHANGE</div>
                        <div className={`flex justify-end itmes-center w-[90px] text-inherit text-xs`}>30D CHANGE</div>
                        <div className={`flex justify-end itmes-center w-[100px] text-inherit text-xs`}>VOLUME</div>
                        <div className={`flex justify-end itmes-center w-[100px] text-inherit text-xs`}>FDV</div>
                    </header>
                </div>
            </div>

            <div className="Tokens_Table w-full overflow-x-auto" ref={scrollDriverRef}>
                <div className="w-fit min-w-full xl:w-full">
                    {/* <header className={`w-full flex justify-between items-center font-medium text-white/60 pl-2 pr-6 sticky top-0 right-0 z-9 py-1 border-b border-b-[var(--border)] `}>
                        <div className={`flex items-center bg-[#121212] w-[250px] pl-5 pr-3 gap-x-2 h-[39px] sticky left-0 z-1 text-xs xl:w-[270px] max-[500px]:w-[200px]`}>TOKENS</div>

                        <div className={`flex justify-end itmes-center w-[100px] text-inherit text-xs`}>PRICE</div>
                        <div className={`flex justify-end itmes-center w-[90px] text-inherit text-xs`}>1H CHANGE</div>
                        <div className={`flex justify-end itmes-center w-[90px] text-inherit text-xs`}>1D CHANGE</div>
                        <div className={`flex justify-end itmes-center w-[90px] text-inherit text-xs`}>30D CHANGE</div>
                        <div className={`flex justify-end itmes-center w-[100px] text-inherit text-xs`}>VOLUME</div>
                        <div className={`flex justify-end itmes-center w-[100px] text-inherit text-xs`}>FDV</div>
                    </header> */}

                    <div className="w-full CT_Ul">
                        {
                            state.loading 
                            ?
                            tokensLoadingArr.map((_, _lIdx) => (
                                <div key={`items-tokensLoadingArr-${_lIdx}`}
                                className={`w-full flex token_list_div justify-between gap-x-4 font-medium items-center pl-2 pr-6 py-3 border-b border-b-[var(--border)] `}>
                                    <div className={`text-white token_list_div_first gap-x-2 bg-inherit flex items-center w-[250px] pl-4 pr-3 h-[39px] sticky left-0 z-5 xl:w-[270px] max-[500px]:w-[220px]`}>
                                        <div className="w-fit">
                                            <Skeleton className="rounded-full w-[27px] h-[27px]" />
                                        </div>
                                        <Skeleton className="w-[calc(100%-33px)] h-[18px] rounded-sm" />
                                    </div>

                                    <div className={`flex justify-end itmes-center w-[100px] text-inherit text-sm gap-x-2`}>
                                        <Skeleton className="w-full h-[18px] rounded-sm" />
                                    </div>
                                    <div className={`flex justify-end itmes-center w-[90px] text-inherit text-sm`}>
                                        <Skeleton className="w-full h-[18px] rounded-sm" />
                                    </div>
                                    <div className={`flex justify-end itmes-center w-[90px] text-inherit text-sm`}>
                                        <Skeleton className="w-full h-[18px] rounded-sm" />
                                    </div>
                                    <div className={`flex justify-end itmes-center w-[90px] text-inherit text-sm`}>
                                        <Skeleton className="w-full h-[18px] rounded-sm" />
                                    </div>

                                    <div className={`flex justify-end itmes-center w-[100px] text-inherit text-sm gap-x-2`}>
                                        <Skeleton className="w-full h-[18px] rounded-sm" />
                                    </div>

                                    <div className={`flex justify-end itmes-center w-[100px] text-inherit text-sm gap-x-2`}>
                                        <Skeleton className="w-full h-[18px] rounded-sm" />
                                    </div>
                                </div>
                            ))
                            :
                            (
                                tokens.length === 0 ?
                                <div className="w-full flex items-center justify-center">
                                    <span className="text-white/70 p-5 capitalize">No data to display</span>
                                </div>
                                :
                                tokens.map((token, index: number) => (
                                    // check global.css, there is something we did for token_list_div and _first
                                    <Link href={`/invest/${token._id}`} key={`items-${token._id}-${index}`}
                                    className={`w-full token_list_div flex justify-between gap-x-4 font-medium items-center pl-2 pr-6 py-3 border-b border-b-[var(--border)] `}>
                                        <div className={`text-white gap-x-2 token_list_div_first flex items-center w-[250px] pl-1 min-[400px]:pl-4 pr-3 h-[39px] sticky left-0 z-5 xl:w-[270px] max-[500px]:w-[220px]`}>
                                            <div className="w-fit">
                                                <div className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] rounded-full bg-white/75"></div>
                                            </div>
                                            <span className="text-sm capitalize truncate ml-1">AirBnB lagos Nigeria</span>
                                            <span className="text-white/60 text-[13px] sm:text-sm font-light ml-0">ABLG</span>
                                        </div>

                                        <div className={`flex justify-end itmes-center w-[100px] text-inherit text-sm gap-x-2`}>
                                            <span className="" title="0.0003451678">0.000345</span>
                                            <span className="text-white/36">AGR</span>
                                        </div>
                                        <div className={`flex justify-end itmes-center w-[90px] text-inherit text-sm`}>
                                            <span className={`${token.one_hr_change > 0 ? "text-[var(--text-green)]" : "text-[var(--text-red)]"}`}>
                                                {`${token.one_hr_change > 0 ? "+" : ""}${token.one_hr_change}%`}
                                            </span>
                                        </div>
                                        <div className={`flex justify-end itmes-center w-[90px] text-inherit text-sm`}>
                                            <span className={`${token.one_day_change > 0 ? "text-[var(--text-green)]" : "text-[var(--text-red)]"}`}>
                                                {`${token.one_day_change > 0 ? "+" : ""}${token.one_day_change}%`}
                                            </span>
                                        </div>
                                        <div className={`flex justify-end itmes-center w-[90px] text-inherit text-sm`}>
                                            <span className={`${token.thirty_day_change > 0 ? "text-[var(--text-green)]" : "text-[var(--text-red)]"}`}>
                                                {`${token.thirty_day_change > 0 ? "+" : ""}${token.thirty_day_change}%`}
                                            </span>
                                        </div>

                                        <div className={`flex justify-end itmes-center w-[100px] text-inherit text-sm gap-x-2`}>
                                            <span className="" title="45,120.35">45.12K</span>
                                            <span className="text-white/36">AGR</span>
                                        </div>

                                        <div className={`flex justify-end itmes-center w-[100px] text-inherit text-sm gap-x-2`}>
                                            <span className="" title="345,670.45">345.67K</span>
                                            <span className="text-white/36">AGR</span>
                                        </div>
                                    </Link>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}