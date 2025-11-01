"use client";

import P2PChat from "@/components/dashboard/p2pChat";
import { AmountFilter, Filter, PaymentMethod } from "@/components/dashboard/p2pSide";
import { Skeleton } from "@/components/ui/loading";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdSearch, IoMdTime } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";

type FiltersType = {
    filters: any[];
    amount: string;
    payment_methods: string[];
    update: number;
};

export default function P2P() {

    const [isBuy, setIsBuy] = useState(true);
    const [vendor, setVendor] = useState({name: ""});
    const [modal, setModal] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filtersData, setFiltersData] = useState<FiltersType>({
        filters: [0, 0, 0], amount: "0", payment_methods: ["All"], update: 0,
    });
    
    const payBg = ["yellow", "green", "red"];

    const vendors = [
        {
            name: "Richy Boss", payment_duration: 30, completed_orders: 2235, orders: 2240,
            lowerLimits: 10.000, upperLimits: 50000.000, quantity: "48,199.509 AGR", pos: 0, verified: true,
            payments: ["First Bank", "GTB Bank (Guarantee Trust Bank)", "Kuda", "Opay", "Bank Transfer", "Palmpay"]
        },
        {
            name: "BLACKBOY001", payment_duration: 15, completed_orders: 4255, orders: 4270,
            lowerLimits: 2.000, upperLimits: 50000.000, quantity: "49,209.509 AGR", pos: 1, verified: true,
            payments: ["GTB Bank (Guarantee Trust Bank)", "Kuda", "Opay", "Bank Transfer"]
        },
        {
            name: "SIR LAWSON 001", payment_duration: 30, completed_orders: 1235, orders: 1240,
            lowerLimits: 2.000, upperLimits: 40000.000, quantity: "38,589.509 AGR", pos: 2, verified: false,
            payments: ["First Bank", "Kuda", "Opay", "Bank Transfer"]
        },
        ...Array(9).fill(0).map((_, i) => ({
            name: "Sacrasys", payment_duration: 30, completed_orders: 325, orders: 340,
            lowerLimits: 100.000, upperLimits: 600.000, quantity: "50,000 AGR", pos: i+3, verified: true,
            payments: ["First Bank", "Kuda", "Opay", "Bank Transfer"]
        }))
    ];
    const [filteredVendors, setFilteredVendors] = useState(vendors);

    const updateFn = useCallback((type: string, updateData: any) => {

        const newData = { ...filtersData, [type]: updateData, update: Date.now() };
        // console.log("update", type, updateData, filtersData, newData);

        // amount filter first
        const f = vendors.filter(_v => _v.upperLimits >= parseInt(newData.amount));

        // payments_method filter, if all is clicked then just spit out all of f above
        // user will most likely only select 1 (or at most 3 - 5) bank if he didn't use "All" method
        // vendor will likely also have about 10 banks too, so complexity isn't to be worried about
        const f1 = (
            newData.payment_methods.includes("All") ? 
            f 
            : 
            f.filter(_v => {
                const py: string[] = newData.payment_methods;
                return _v.payments.find((_payment: string) => py.includes(_payment)) ? true : false;
            })
        );

        // const vendor_types = ["Show all Vendors", "Show only Verified Vendors", "Show only Eligible Vendors"];
        // const sortings = ["Overall sorting", "Completed order number", "Completion Rate", "Price (lowest to highest)"];
        const [vendorType, sortings, durations] = newData.filters;
        const _duration = ["", 15, 30];

        const f2 = f1.filter(_v => {
            if(durations === 0 || _v.payment_duration === _duration[durations]) {
                if(vendorType === 0) return true;
                else if(vendorType === 1) return _v.verified;
                else return _v.completed_orders >= 100; // eligible vendors are those with >=100 completed orders
            } else {
                return false;
            }
        });

        const f3 = (
            sortings === 0 ? f2 :
            f2.sort((x, y) => {
                if(sortings === 1) {
                    if(y.completed_orders === x.completed_orders) {
                        if(y.upperLimits === x.upperLimits) {
                            const xi = Math.floor((x.completed_orders / x.orders) * 100);
                            const yi = Math.floor((y.completed_orders / y.orders) * 100);
                            return yi - xi;
                        } else {
                            return y.upperLimits - x.upperLimits
                        }
                    } else {
                        return y.completed_orders - x.completed_orders
                    }
                } else if(sortings === 2) {
                    return y.completed_orders - x.completed_orders;
                } else if(sortings === 3) {
                    const xi = Math.floor((x.completed_orders / x.orders) * 100);
                    const yi = Math.floor((y.completed_orders / y.orders) * 100);
                    return yi - xi;
                } else {
                    return y.upperLimits - x.upperLimits;
                }
            })
        );

        const f_lst = f3.map((_v, _v_idx) => ({ ..._v, pos: _v_idx }));
        // console.log("update lst", f_lst);

        setFilteredVendors(f_lst);

        setFiltersData(newData);
    }, [filtersData.update]);

    useEffect(() => {
        const fn = () => {
            setTimeout(() => setLoading(false), 3000);
        }
        fn();
    }, []);

    const vendorsLoading = useMemo(() => Array(6).fill(0), []);


    return (
        <div className="w-full">
            <div className="flex w-full h-[calc(100vh-70px)]">
                
                <aside className={`w-full sm:w-[390px] overflow-hidden ${vendor?.name ? "max-sm:hidden" : ""} sticky left-0 top-0 z-3 h-full sm:border-r border-r-[rgb(38,39,45)]`}>
                    <div className="w-full h-full relative">
                        <div className="w-full h-full">
                            <section className="w-full px-3 py-2 mt-2">
                                {
                                    loading ?
                                    <div className="w-full px-3 py-2 text-[var(--text-grey)] flex items-center">
                                        <Skeleton className="w-full rounded-full h-[36px]" />
                                    </div>
                                    :
                                    <div className="search-with-icon text-sm bg-[var(--hover-bg)] w-full px-3 py-2 text-[var(--text-grey)] rounded-full flex items-center justify-between">
                                        <IoMdSearch className="w-5 h-5" />
                                        <input id="Search" className="text-inherit w-[calc(100%-30px)] border-none outline-none" placeholder="Search vendor" />
                                    </div>
                                }
                            </section>
                            <section className="w-full mt-0 px-3 py-3 border-b border-b-[rgb(38,39,45)]">
                                <div className="w-fit flex items-center border border-[rgb(38,39,45)] rounded-full p-1">
                                    <button className={`py-1 px-3 text-white text-xs rounded-full ${!loading && "cursor-pointer"} ${isBuy ? "bg-[var(--hover-bg)]" : ""}`}
                                    onClick={() => !loading && setIsBuy(true)}>Buy</button>
                                    <button className={`py-1 px-3 text-white text-xs rounded-full ${!loading && "cursor-pointer"} ${!isBuy ? "bg-[var(--hover-bg)]" : ""}`}
                                    onClick={() => !loading && setIsBuy(false)}>Sell</button>
                                </div>
                                <div className="mt-4 w-full flex items-center justify-between">
                                    <div className="flex items-center w-fit gap-x-3">
                                        <button className={`flex items-center w-fit ${!loading && "cursor-pointer hover:opacity-[0.75]"}`}>
                                            <span className="text-xs text-white/96">AGR</span>
                                            <IoMdArrowDropdown className="w-[16px] h-[15px] text-white/50 ml-[3px]" />
                                        </button>
                                        <button className={`flex items-center w-fit ${!loading && "cursor-pointer hover:opacity-[0.75]"}`}
                                        onClick={() => !loading && setModal("amount")}>
                                            <span className="text-xs text-white/96">Amount</span>
                                            <IoMdArrowDropdown className="w-[16px] h-[15px] text-white/50 ml-[3px]" />
                                        </button>
                                        <button className={`flex items-center w-fit ${!loading && "cursor-pointer hover:opacity-[0.75]"}`}
                                        onClick={() => !loading && setModal("payment_methods")}>
                                            <span className="text-xs text-white/96">All Payment Methods</span>
                                            <IoMdArrowDropdown className="w-[16px] h-[15px] text-white/50 ml-[3px]" />
                                        </button>
                                    </div> 

                                    <button className={`flex items-center w-fit ${!loading && "cursor-pointer hover:opacity-[0.75]"}`}
                                    onClick={() => !loading && setModal("filters")}>
                                        <FiFilter className="w-[18px] h-[18px] text-white" />
                                    </button>
                                </div>
                            </section>
                            <section className="w-full mt-0 h-[calc(100%-158px)] overflow-y-auto transparent-scrollbar">
                                
                                {loading && <div className={`w-full px-3 min-h-full`}>
                                    <div className="h-fit w-full">
                                        {vendorsLoading.map((_, idx) => (
                                            <div className={`w-full p-3 border-b border-b-[rgb(38,39,45)]`} 
                                            key={`vendor-li-loading-${idx}`}>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="flex items-center w-fit">
                                                        <Skeleton className="w-[150px] h-[21px] rounded-sm" />
                                                    </div>
                                                    <div className="flex items-center w-fit">
                                                        <Skeleton className="w-[90px] h-[21px] rounded-sm" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center w-fit mt-2">
                                                    <Skeleton className="w-[170px] h-[18px] rounded-sm" />
                                                </div>
                                                <div className="flex items-center w-fit mt-2">
                                                    <Skeleton className="w-[100px] h-[30px] rounded-sm" />
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="mt-3 flex flex-col gap-y-2 w-[calc(100%-45px)]">
                                                        <Skeleton className="w-[180px] h-[15px] rounded-sm" />
                                                        <Skeleton className="w-[180px] h-[15px] rounded-sm" />
                                                    </div>
                                                    <div className="flex items-center w-fit">
                                                        <Skeleton className="w-[50px] h-[20px] rounded-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>}
                                
                                {!loading && <div className={`w-full px-3 min-h-[210px] relative`} style={{ height: (vendors.length * 172) + "px"}}>
                                    <div className="h-fit w-full">
                                        {filteredVendors.map((_vendor, idx) => (
                                            <button className={`w-full p-3 cursor-pointer border-b border-b-[rgb(38,39,45)] absolute cursor-pointer left-0 transition-top duration-300 hover:bg-[var(--hover-bg)]`} 
                                            key={`vendor-li-${idx}`} style={{ top: `${_vendor.pos*172}px` }} onClick={() => setVendor(_vendor)}>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="flex items-center w-fit gap-x-2">
                                                        <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center bg-[var(--primary)] text-black text-xs font-medium">
                                                            {_vendor?.name[0] || "U"}
                                                        </div>
                                                        <span className="text-xs font-medium">{_vendor.name}</span>
                                                        <RiVerifiedBadgeFill className="w-[15px] h-[15px] text-[var(--primary-light)]" />
                                                    </div>
                                                    <div className="flex items-center gap-x-1 text-white/50 w-fit">
                                                        <IoMdTime className="w-[16px] h-[16px] text-inherit" />
                                                        <span className="text-xs">{`${_vendor.payment_duration}Min(s)`}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[11px] text-white/50 gap-x-1 w-fit mt-2">
                                                    <span className="">{`${_vendor.completed_orders} Orders | `}</span>
                                                    <span className="">{`${Math.floor((_vendor.completed_orders / _vendor.orders) * 100)} %`}</span>
                                                </div>
                                                <h1 className="text-xl font-medium text-white text-start mt-2">$1.200</h1>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="mt-3 flex flex-col gap-y-1 max-w-[calc(100%-45px)]">
                                                        <div className="flex items-center text-[11px] gap-x-1">
                                                            <span className="text-white/50">Limits </span>
                                                            <span className="text-white font-medium">
                                                                {`${_vendor.lowerLimits} - ${_vendor.upperLimits} $AGR`}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center text-[11px] gap-x-1">
                                                            <span className="text-white/50">Quantity</span>
                                                            <span className="text-white font-medium">{_vendor.quantity}</span>
                                                        </div>
                                                        <div className="flex items-center text-[11px] truncate gap-x-2 w-full">
                                                            {_vendor.payments.map((payment: string, _idx: number) => (
                                                                <div className="flex items-center gap-x-1 w-fit" key={`vendor-payment-${_idx}`}>
                                                                    <div className={`w-[2px] h-[10px] opacity-[0.75]`} style={{ backgroundColor: payBg[_idx%3] }}></div>
                                                                    <span className="text-white/50 inline-block max-w-[100px] truncate">{payment}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="w-fit text-white/50 pt-1 pb-2 px-3 text-xs rounded-full border border-[rgb(38,39,45)]">{isBuy ? "Buy" : "Sell"}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>}
                            </section>
                        </div>

                        <div className={`absolute w-full h-[calc(100%-100px)] overflow-y-auto transparent-scrollbar max-h-full bg-[#121212] shadow-[var(--message-footer-card)] rounded-t-[15px] left-0 z-99 transition-all duration-300 ease-in-out ${modal ? "-translate-y-full" : "translate-y-full"}`}>
                            {
                            modal === "filters" ?
                            <Filter fn={(arr: number[]) => updateFn("filters", arr)} closeFn={() => setModal("")} />
                            :
                            (modal === "amount" ?
                                <AmountFilter fn={(amt: any) => updateFn("amount", amt)} closeFn={() => setModal("")} />
                                :
                                <PaymentMethod fn={(arr: string[]) => updateFn("payment_methods", arr)} closeFn={() => setModal("")} />
                            )
                            }
                        </div>
                    </div>
                </aside>

                <main className={`w-full sm:w-[calc(100%-390px)] ${!vendor?.name ? "max-sm:hidden" : ""} h-full`}>
                    {
                        !vendor?.name ?
                        <div className="w-full h-full flex justify-center items-center px-4">
                            <div className='flex flex-col w-[500px] max-w-full items-center gap-y-3'>
                                <div className="w-[230px] sm:w-[280px] h-[200px] bg-white rounded-sm"></div>
                                <h1 className="text-xl sm:text-2xl text-white mt-5 font-bold">Find A Peer-To-Peer vendor Now</h1>
                                <p className="text-sm text-white/85 text-center">
                                    Exchange your tokens to your native/local currencies faster, securely and without any hassles.
                                    You can start by trying out the first vendor.
                                </p>
                                <button className="w-fit py-2 px-5 rounded-full bg-[var(--primary)] text-white mt-4 font-medium cursor-pointer">
                                    First Vendor
                                </button>
                            </div>
                        </div>
                        :
                        <P2PChat />
                    }
                </main>
            </div>
        </div>
    )
}