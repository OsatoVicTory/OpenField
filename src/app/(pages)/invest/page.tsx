"use client";

import { filterTokens } from "@/app/actions/token";
import { FormatTokenPrice, Skeleton, Spinner } from "@/components/ui/loading";
import useScrollThrottle from "@/hooks/useScroll";
import { LoadingType, TokenType } from "@/types";
import { formatValue } from "@/utils/helpers";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineGeneratingTokens, MdOutlineWbTwilight, MdWhatshot } from "react-icons/md";
import { RiMedalLine } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";

export default function InvestPage() {

    const pageSize = 20;
    const [loading, setLoading] = useState<LoadingType>({ loading: true, error: false, loaded: false, state: 0 });
    const lstId = useRef<string>("");
    const filtersRef = useRef<any>({ cap: 0, cat: [0] });

    const [showFilter, setShowFilter] = useState(false);

    // const [tokens, setTokens] = useState(Array(20).fill(0). map((_, i) => {
    //     const mul = (i && i%3 === 0) ? -1.0 : 1.0;
    //     return { _id: i, one_hr_change: 3.21 * mul, one_day_change: 41.87 * mul, thirty_day_change: 125.89 * mul };
    // }));

    const [tokens, setTokens] = useState<TokenType[]>([]);
    const [topFilter, setTopFilter] = useState("Trending");
    const [showDropdown, setShowDropdown] = useState(false);

    const [filters, setFilters] = useState({ cap: 0, cat: [0] });
    const marketCaps = ["< $100K", "$100K - $500K", "$500K - $1M", "$1M - $10M", "$10M - $100M", "$100M - $1B", "$1B+"];
    const categories = ["Agriculture", "Real Eloading Mgt.", "Digital Arts", "Start ups", "Music"];

    const scrollDriverRef = useRef<HTMLDivElement | null>(null);
    const scrollDrivenRef = useRef<HTMLDivElement | null>(null); 


    const FilterFetchTokens = useCallback(async (changes = false) => {
        try {
            //if changes is true, override loaded to false so we can show loading
            //as changes true means this is not triggered onScroll to append more data
            setLoading({ ...loading, loading: true, loaded: !changes, error: false }); 

            const { cap, cat } = filtersRef.current;
            const filter: any = {};

            if(cap === 0) filter["total_supply"] = { "$lt": 100000 };
            if(cap === 1) filter["total_supply"] = { "$lte": 500000, "$gte": 100000 };
            if(cap === 2) filter["total_supply"] = { "$lte": 1000000, "$gt": 500000 };
            if(cap === 3) filter["total_supply"] = { "$lte": 10000000, "$gt": 1000000 };
            if(cap === 4) filter["total_supply"] = { "$lte": 100000000, "$gt": 10000000 };
            if(cap === 5) filter["total_supply"] = { "$lte": 1000000000, "$gt": 100000000 };
            if(cap === 6) filter["total_supply"] = { "$gt": 1000000000 };

            if(cat.length > 0 && !cat.includes(0)) {
                filter["categories"] = { "$elemMatch": { "$in": cat.map((c: any) => categories[c-1]) }};
            }

            const res = await filterTokens(lstId.current, pageSize, filter);
            lstId.current = res[res.length - 1]?._id || "";
            setTokens(changes ? res : [...tokens, ...res]); // loading.state helps track when tokens changes
            setLoading({ loading: false, error: false, loaded: true, state: Date.now() });
        } catch (err) {
            setLoading({ ...loading, loading: false, error: true });
        } 
    }, [loading.loading, loading.loaded, loading.state, tokens.length]); // tokens.length is supported by loading.state just in case

    const filterClick = useCallback((type: string, cIdx: number) => {
        if(loading.loading) return;
        
        // setLoading({ ...loading, loaded: false }); // reset loaded cus there has been changes

        if(type === "cap") {
            filtersRef.current = { ...filters, [type]: cIdx };
            setFilters({ ...filters, [type]: cIdx });
        } else {
            const newCat = [];
            let fnd = false;
            filters.cat.forEach(p => {
                if(p !== cIdx) newCat.push(p);
                else fnd = true;
            });

            if(!fnd) newCat.push(cIdx);
            filtersRef.current = { ...filters, [type]: newCat };
            setFilters({ ...filters, [type]: newCat });
        }

        lstId.current = "";
        FilterFetchTokens(true);

    }, [loading.loading, loading.loaded, filters.cap, filters.cat.length]);

    const tokensLoadingArr = useMemo(() => Array(12).fill(0), []);

    useEffect(() => {
        const scrollDriver = scrollDriverRef.current;
        const scrollDriven = scrollDrivenRef.current;

        const handleScroll = () => {
            if(scrollDriven && scrollDriver && scrollDriven.scrollLeft !== scrollDriver.scrollLeft) {
                scrollDriven.scrollLeft = scrollDriver.scrollLeft;
            }
        };

        FilterFetchTokens(true);

        if(scrollDriven && scrollDriver) {
            scrollDriver.addEventListener("scroll", handleScroll);
        }

        return () => {
            if(scrollDriven && scrollDriver) {
                scrollDriver.removeEventListener("scroll", handleScroll);
            }
        };

    }, []);

    useScrollThrottle("dashboard-main", ({ y, scrollHeight, clientHeight }: any) => {
        if(loading.loaded && Math.ceil(scrollHeight - y - clientHeight) < 1) FilterFetchTokens();
    }, 500,[loading.loaded, loading.state]);


    return (
        <div className="w-full flex">

            <aside className={`w-full sm:w-[270px] bg-[var(--secondary3)]/15 h-[calc(100vh-69px)] overflow-hidden ${!showFilter ? "max-sm:hidden" : ""} sticky left-0 top-[69px] z-3 sm:border-r border-r-[rgb(38,39,45)]`}>
                <div className="w-full h-full overflow-y-auto">
                    <div className="w-full px-4 py-4 border-b border-b-[rgb(38,39,45)] flex items-center justify-between">
                        <div className="flex items-center w-fit gap-x-3 py-[2px]">
                            <div className="w-fit flex items-center py-2 px-2 border border-[var(--border)] rounded-sm">
                                <IoFilterSharp className="w-[16px] h-[16px] text-white" />
                            </div>
                            <h2 className="text-white font-bold text-xl">Filters</h2>
                        </div>

                        <button className="w-fit ml-3 sm:hidden cursor-pointer hover:bg-[var(--hover-bg)] flex items-center p-1 rounded-sm"
                        onClick={() => setShowFilter(false)}>
                            <AiOutlineClose className="w-[18px] h-[18px] text-white" />
                        </button>

                    </div>
                    <div className="w-full border-b border-b-[rgb(38,39,45)] px-4 py-6 flex flex-col gap-y-6">
                        <h2 className="text-white text-md font-medium">Market Cap in $AGR</h2>
                        <div className="flex flex-wrap w-full gap-x-3 gap-y-4">
                            <button onClick={() => filterClick("cap", 0)}
                            className={`w-fit text-[13px] rounded-md border border-[var(--border)] py-[4px] px-3 ${!loading.loading && "cursor-pointer"} ${filters.cap === 0 ? "bg-[rgba(255,255,255,0.12)] font-medium text-white" : "text-white/70 bg-[var(--secondary3)]/20 hover:bg-[rgba(255,255,255,0.12)]"}`}>
                                {"All"}
                            </button>
                            {marketCaps.map((_cap, _cIdx) => (
                                <button onClick={() => filterClick("cap", _cIdx+1)} key={`filter_category_${_cIdx}`}
                                className={`w-fit font-medium text-[13px] rounded-md border border-[var(--border)] py-[4px] px-2 ${!loading.loading && "cursor-pointer"} ${filters.cap === _cIdx+1 ? "bg-[rgba(255,255,255,0.12)] text-white" : "text-white/60 bg-[var(--secondary3)]/20 hover:bg-[rgba(255,255,255,0.12)]"}`}>
                                    {_cap}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full border-b border-b-[rgb(38,39,45)] px-4 py-6 mt-0 flex flex-col gap-y-6">
                        <h2 className="text-white text-md font-medium">Categories</h2>
                        <div className="flex flex-wrap w-full gap-x-3 gap-y-4">
                            <button onClick={() => filterClick("cat", 0)}
                            className={`w-fit text-[13px] rounded-md border border-[var(--border)] py-[4px] px-3 ${!loading.loading && "cursor-pointer"} ${filters.cat.includes(0) ? "bg-[rgba(255,255,255,0.12)] font-medium text-white" : "text-white/70 bg-[var(--secondary3)]/20 hover:bg-[rgba(255,255,255,0.12)]"}`}>
                                {"All"}
                            </button>
                            {categories.map((_cat, _catIdx) => (
                                <button onClick={() => filterClick("cat", _catIdx+1)} key={`filter_category_${_catIdx}`}
                                className={`w-fit font-medium text-[13px] rounded-md border border-[var(--border)] py-[4px] px-2 ${!loading.loading && "cursor-pointer"} ${filters.cat.includes(_catIdx+1) ? "bg-[rgba(255,255,255,0.12)] text-white" : "text-white/60 bg-[var(--secondary3)]/20 hover:bg-[rgba(255,255,255,0.12)]"}`}>
                                    {_cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            <main className={`w-full sm:w-[calc(100%-270px)] min-h-[calc(100vh-70px)] bg-[#121212] ${showFilter ? "max-sm:hidden" : ""}`}>
                <div className="w-full flex flex-col sticky top-[68px] right-0 z-11 bg-inherit">
                    <div className="w-full px-6 py-4 border-b border-b-[rgb(38,39,45)] flex items-center justify-between">
                        <div className="flex items-center w-fit gap-x-4">
                            <h2 className="text-white font-bold text-xl">Tokens</h2>
                            <div className="flex items-center w-fit gap-x-3 max-[400px]:hidden">
                                <button className={`w-fit flex items-center py-2 px-3 rounded-md border border-[var(--border)] ${!loading.loading && "cursor-pointer"} ${topFilter === "Trending" ? "bg-[rgba(255,255,255,0.12)] text-white font-medium" : "bg-[var(--secondary3)]/30 hover:bg-[rgba(255,255,255,0.12)] text-white/60"}`}
                                onClick={() => !loading.loading && setTopFilter("Trending")}>
                                    <MdWhatshot className="w-[16px] h-[16px] fill-current stroke-current" />
                                    <span className="max-lg:hidden ml-2 text-sm text-inherit">Trending</span>
                                </button>
                                <button className={`w-fit flex items-center py-2 px-3 rounded-md border border-[var(--border)] ${!loading.loading && "cursor-pointer"} ${topFilter === "New" ? "bg-[rgba(255,255,255,0.12)] text-white font-medium" : "bg-[var(--secondary3)]/30 hover:bg-[rgba(255,255,255,0.12)] text-white/60"}`}
                                onClick={() => !loading.loading && setTopFilter("New")}>
                                    <MdOutlineWbTwilight className="w-[16px] h-[16px] fill-current stroke-current" />
                                    <span className="max-lg:hidden ml-2 text-sm text-inherit">New</span>
                                </button>
                                <button className={`w-fit flex items-center py-2 px-3 rounded-md border border-[var(--border)] ${!loading.loading && "cursor-pointer"} ${topFilter === "Top" ? "bg-[rgba(255,255,255,0.12)] text-white font-medium" : "bg-[var(--secondary3)]/30 hover:bg-[rgba(255,255,255,0.12)] text-white/60"}`}
                                onClick={() => !loading.loading && setTopFilter("Top")}>
                                    <RiMedalLine className="w-[16px] h-[16px] fill-current stroke-current" />
                                    <span className="max-lg:hidden ml-2 text-sm text-inherit">Top</span>
                                </button>
                            </div>

                            <div className="items-center w-fit gap-x-3 hidden max-[400px]:flex relative">
                                <button className={`w-fit flex items-center pt-1 pb-[6px] px-2 rounded-md border border-[var(--border)] ${!loading.loading && "cursor-pointer"} bg-[rgba(255,255,255,0.12)] text-white font-medium`}
                                onClick={() => !loading.loading && setShowDropdown(!showDropdown)}>
                                    {topFilter === "Trending" ?
                                        <MdWhatshot className="w-[16px] h-[16px] fill-current stroke-current" />
                                        :
                                        (
                                            topFilter === "New" ?
                                            <MdOutlineWbTwilight className="w-[16px] h-[16px] fill-current stroke-current" />
                                            :
                                            <RiMedalLine className="w-[16px] h-[16px] fill-current stroke-current" />
                                        )
                                    }
                                    <TiArrowSortedDown className={`w-[15px] h-[16px] mt-[1px] text-white/60 ml-1 transition-all duration-300 ease-in-out ${showDropdown ? "rotate-180" : "rotate-0"}`} />
                                </button>
                                
                                <div className={`dropdown-par dropdown dropdown_${showDropdown} flex flex-col gap-y-1 items-center w-[140px] gap-x-3 p-1 absolute top-[120%] right-0 z-19 bg-[#303030] overflow-hidden rounded-md shadow-[var(--message-footer-card)]`}>
                                    <button className={`w-full flex items-center py-2 px-3 cursor-pointer hover:bg-[rgba(255,255,255,0.12)] text-white/95`}
                                    onClick={() => {setTopFilter("Trending"); setShowDropdown(false);}}>
                                        <MdWhatshot className="w-[16px] h-[16px] fill-current stroke-current" />
                                        <span className="ml-2 text-sm text-inherit">Trending</span>
                                    </button>
                                    <button className={`w-full flex items-center py-2 px-3 cursor-pointer hover:bg-[rgba(255,255,255,0.12)] text-white/95`}
                                    onClick={() => {setTopFilter("New"); setShowDropdown(false);}}>
                                        <MdOutlineWbTwilight className="w-[16px] h-[16px] fill-current stroke-current" />
                                        <span className="ml-2 text-sm text-inherit">New</span>
                                    </button>
                                    <button className={`w-full flex items-center pt-2 pb-3 px-3 cursor-pointer hover:bg-[rgba(255,255,255,0.12)] text-white/95`}
                                    onClick={() => {setTopFilter("Top"); setShowDropdown(false);}}>
                                        <RiMedalLine className="w-[16px] h-[16px] fill-current stroke-current" />
                                        <span className="ml-2 text-sm text-inherit">Top</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="w-fit flex items-center">
                            <button className={`bg-[var(--primary)] rounded-sm sm:rounded-full ${!loading.loading && "cursor-pointer"} py-2 px-3 pr-4 flex items-center`}>
                                <MdOutlineGeneratingTokens className="text-white w-[18px] h-[16px]" />
                                <span className="max-md:hidden text-sm text-white ml-[8px]">Create Token</span>
                            </button>
                            <button className="w-fit ml-3 sm:hidden cursor-pointer hover:bg-[var(--hover-bg)] flex items-center pt-1 pb-[6px] px-3 border border-[rgb(38,39,45)] rounded-sm"
                            onClick={() => setShowFilter(true)}>
                                <IoFilterSharp className="w-[18px] h-[16px] text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="Tokens_Table w-full overflow-x-auto hide_scrollbar" ref={scrollDrivenRef}>
                        <div className="w-fit min-w-full xl:w-full">
                            <header className={`w-full flex justify-between gap-x-3 token_list_div items-center font-medium text-white/60 pl-2 pr-6 sticky top-0 right-0 z-9 py-1 border-b border-b-[var(--border)] `}>
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
                                !loading.loaded // not loaded only means, currently loading or error, there is no data to show
                                ?
                                (
                                    loading.error
                                    ?
                                    <div className="w-full p-5">
                                        <h1>There was an Error loading data</h1>
                                    </div>
                                    :
                                    tokensLoadingArr.map((_, _lIdx) => (
                                        <div key={`items-tokensLoadingArr-${_lIdx}`}
                                        className={`w-full flex justify-between gap-x-3 token_list_div font-medium items-center pl-2 pr-6 py-3 border-b border-b-[var(--border)] `}>
                                            <div className={`text-white gap-x-2 token_list_div_first bg-inherit flex items-center w-[250px] pl-4 pr-3 h-[39px] sticky left-0 z-5 xl:w-[270px] max-[500px]:w-[220px]`}>
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
                                )
                                :
                                ( // it has loaded now, so either empty or null empty data
                                    tokens.length === 0 
                                    ?
                                    <div className="w-full flex items-center justify-center">
                                        <span className="text-white/70 p-5 capitalize">No data to display</span>
                                    </div>
                                    :
                                    <>
                                    {
                                        tokens.map((token, index: number) => (
                                            // check global.css, there is something we did for token_list_div and _first
                                            <Link href={`/invest/${token._id}`} key={`items-${token._id}-${index}`}
                                            className={`w-full token_list_div flex justify-between gap-x-gap-x-3 font-medium items-center pl-2 pr-6 py-3 border-b border-b-[var(--border)] `}>
                                                <div className={`text-white gap-x-2 token_list_div_first flex items-center w-[250px] pl-4 pr-3 h-[39px] sticky left-0 z-5 xl:w-[270px] max-[500px]:w-[220px]`}>
                                                    <div className="w-fit">
                                                        <div className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] rounded-full bg-white/75"></div>
                                                    </div>
                                                    <span className="text-sm capitalize truncate ml-1">{token.name}</span>
                                                    <span className="text-white/60 text-[13px] sm:text-sm font-light ml-0">{token.meta_data.symbol}</span>
                                                </div>

                                                <div className={`flex justify-end itmes-center w-[100px] text-inherit text-sm gap-x-2`}>
                                                    <span className="" title="0.0003451678"><FormatTokenPrice price={token.price} /></span>
                                                    <span className="text-white/36">{token.meta_data.symbol}</span>
                                                </div>
                                                <div className={`flex justify-end itmes-center w-[90px] text-inherit text-sm`}>
                                                    <span className={`${token.one_hr.change > 0 ? "text-[var(--text-green)]" : "text-[var(--text-red)]"}`}>
                                                        {`${token.one_hr.change > 0 ? "+" : ""}${token.one_hr.change}%`}
                                                    </span>
                                                </div>
                                                <div className={`flex justify-end itmes-center w-[90px] text-inherit text-sm`}>
                                                    <span className={`${token.one_day.change > 0 ? "text-[var(--text-green)]" : "text-[var(--text-red)]"}`}>
                                                        {`${token.one_day.change > 0 ? "+" : ""}${token.one_day.change}%`}
                                                    </span>
                                                </div>
                                                <div className={`flex justify-end itmes-center w-[90px] text-inherit text-sm`}>
                                                    <span className={`${token.thirty_days.change > 0 ? "text-[var(--text-green)]" : "text-[var(--text-red)]"}`}>
                                                        {`${token.thirty_days.change > 0 ? "+" : ""}${token.thirty_days.change}%`}
                                                    </span>
                                                </div>

                                                <div className={`flex justify-end itmes-center w-[100px] text-inherit text-sm gap-x-2`}>
                                                    <span className="" title="45,120.35">{formatValue(token.volume_cnt)}</span>
                                                </div>

                                                <div className={`flex justify-end itmes-center w-[100px] text-inherit text-sm gap-x-2`}>
                                                    <span className="" title="345,670.45">{formatValue(token.price * token.total_supply)}</span>
                                                    <span className="text-white/36">{token.meta_data.symbol}</span>
                                                </div>
                                            </Link>
                                        ))
                                    }

                                    {/* infinite scroll */}
                                    {loading.loading && <div className="w-full px-3 flex justify-center py-6">
                                        <Spinner className="w-[33px] h-[33px] rounded-full" />
                                    </div>}

                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>

            </main>

        </div>
    )
}