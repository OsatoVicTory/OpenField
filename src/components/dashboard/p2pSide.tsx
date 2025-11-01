"use client";

import { useCallback, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoCheckbox } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";

export function PaymentMethod({ fn, closeFn }: { fn: (arr: any[]) => void, closeFn: () => void }) {

    const mp = useRef(new Map([ ["All", true] ]));
    const [update, setUpdate] = useState(0);

    const payment_methods = [
        "First Bank", "Wema Bank", "Stanbic IBTC", "Access Bank", "GTB Bank (Guarantee Trust Bank)", 
        "Opay", "Kuda", "Moniepoint", "Palmpay", "UBA (United Bank of Africa)", "Paypal",
        "Zelle", "Apple Pay", "Google Pay", "Standard Chartered Bank"
    ];

    const resetFn = useCallback(() => {
        mp.current = new Map([ ["All", true] ]);
        setUpdate(Date.now()); 
    }, []);

    const toggleMethod = useCallback((method: string) => {
        if(mp.current.has(method)) {
            mp.current.delete(method);
        } else {
            mp.current.set(method, true);
        }
        setUpdate(Date.now()); // so remount cus ref will not remount changes
    }, []);

    const checkMethod = (method: string) => {
        return mp.current.has(method);
    };

    const _fn = useCallback(() => {
        const arr: string[] = [];
        mp.current.forEach((_, method) => arr.push(method));
        fn(arr);
        closeFn();
    }, []);

    return (
        <div className="w-full h-full">
            <div className="w-full flex justify-between items-center px-4 py-3">
                <h3 className="text-white font-medium text-lg">Payment Methods</h3>
                <button className="w-[21px] h-[21px] rounded-full bg-[var(--hover-bg)] flex items-center justify-center cursor-pointer"
                onClick={() => closeFn()}>
                    <AiOutlineClose className="w-[15px] h-[15px] text-white" />
                </button>
            </div>
            <div className="w-full px-4 py-3">
                <div className="search-with-icon text-sm bg-[var(--hover-bg)] w-full py-2 px-3 text-[var(--text-grey)] rounded-full flex items-center justify-between">
                    <IoMdSearch className="w-4 h-4" />
                    <input id="Search" className="text-inherit w-[calc(100%-25px)] text-sm border-none outline-none" placeholder="Search vendor" />
                </div>
            </div>
            <ul className="list-none w-full">
                <li className="w-full px-4 py-3 flex justify-between items-center" onClick={() => toggleMethod("All")}>
                    <span className="text-white font-medium">All</span>
                    <button className="w-fit flex items-center cursor-pointer">
                        {
                            checkMethod("All") ?
                            <IoCheckbox className="w-[19px] h-[19px] text-white" />
                            :
                            <MdOutlineCheckBoxOutlineBlank className="w-[19px] h-[19px] text-white/50" />
                        }
                    </button>
                </li>
                {payment_methods.map((method, m_idx) => (
                    <li className="w-full px-4 py-3 flex justify-between items-center" 
                    key={`payment-methods-${m_idx}`} onClick={() => toggleMethod(method)}>
                        <span className="text-white text-sm font-medium">{method}</span>
                        <button className="w-fit flex items-center cursor-pointer">
                            {
                                checkMethod(method) ?
                                <IoCheckbox className="w-[19px] h-[19px] text-white" />
                                :
                                <MdOutlineCheckBoxOutlineBlank className="w-[19px] h-[19px] text-white/50" />
                            }
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between items-center w-full sticky bottom-0 left-0 z-1 bg-[#121212] pt-4 pb-5 px-4 border-t border-t-[rgb(38,39,45)]">
                <button className="w-[calc(50%-10px)] rounded-full border border-[var(--border)] hover:bg-[var(--hover-bg)]/35 py-2 px-3 text-white font-medium text-md cursor-pointer"
                onClick={() => resetFn()}>Reset</button>
                <button className="w-[calc(50%-10px)] rounded-full bg-[var(--primary)]/90 hover:bg-[var(--primary)] text-black py-2 px-3 font-medium text-md cursor-pointer"
                onClick={() => _fn()}>Confirm</button>
            </div>

        </div>
    )
}

export function Filter({ fn, closeFn }: { fn: (arr: any[]) => void, closeFn: () => void }) {

    const vendor_types = ["Show all Vendors", "Show only Verified Vendors", "Show only Eligible Vendors"];
    const [vendorType, setVendorType] = useState(0);
    const sortings = ["No sorting", "Overall sorting", "Completed order number", "Completion Rate", "Price (highest to lowest)"];
    const [sorting, setSorting] = useState(0);
    const [durations, setDurations] = useState(0);
    const _durations = ["All", "15 Mins", "30 Mins"]

    return (
        <div className="w-full h-full">
            <div className="w-full flex justify-between items-center px-4 py-4">
                <h3 className="text-white font-medium text-lg">Filters</h3>
                <button className="w-[21px] h-[21px] rounded-full bg-[var(--hover-bg)] flex items-center justify-center cursor-pointer"
                onClick={() => closeFn()}>
                    <AiOutlineClose className="w-[12px] h-[12px] text-white" />
                </button>
            </div>

            <div className="mt-0 w-full">
                <h3 className="text-white font-medium text-[17px] px-4 py-3">Vendor Types</h3>
                <ul className="list-none w-full">
                    {vendor_types.map((_vendor_type, m_idx) => (
                        <li className="w-full px-4 py-3 flex justify-between items-center" 
                        key={`payment-methods-${m_idx}`} onClick={() => setVendorType(m_idx)}>
                            <span className="text-white text-sm">{_vendor_type}</span>
                            <button className="w-fit flex items-center cursor-pointer">
                                {
                                    m_idx === vendorType ?
                                    <IoCheckbox className="w-[19px] h-[19px] text-white" />
                                    :
                                    <MdOutlineCheckBoxOutlineBlank className="w-[19px] h-[19px] text-white/50" />
                                }
                            </button>
                        </li>
                    ))}
                </ul>

                <h3 className="text-white font-medium text-[17px] py-3 px-4">Payment Duration</h3>
                <div className="flex justify-between items-center w-full px-4 pt-2 pb-3">
                    {_durations.map((_duration, d_idx) => (
                        <button key={`duration-filter-${d_idx}`} onClick={() => setDurations(d_idx)}
                        className={`w-[calc(33%-3px)] rounded-full ${durations === d_idx ? "bg-[var(--hover-bg)]/84" : "hover:bg-[var(--hover-bg)]/35"} border border-[var(--border)] py-2 px-3 text-white font-medium text-sm cursor-pointer`}>
                            {_duration}
                        </button>
                    ))}
                </div>


                <h3 className="text-white font-medium text-[17px] py-3 px-4">Sort By</h3>
                <ul className="list-none w-full">
                    {sortings.map((_sorting, index) => (
                        <li className="w-full py-3 px-4 flex justify-between items-center" 
                        key={`filter-sortings-${index}`} onClick={() => setSorting(index)}>
                            <span className="text-white text-sm">{_sorting}</span>
                            <button className="w-fit flex items-center cursor-pointer">
                                {
                                    sorting === index ?
                                    <MdOutlineRadioButtonChecked className="w-[19px] h-[19px] text-white" />
                                    :
                                    <MdOutlineRadioButtonUnchecked className="w-[19px] h-[19px] text-white/50" />
                                }
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-between items-center w-full sticky bottom-0 left-0 z-1 bg-[#121212] pt-4 pb-5 px-4 border-t border-t-[rgb(38,39,45)]">
                <button className="w-[calc(50%-10px)] rounded-full border border-[var(--border)] hover:bg-[var(--hover-bg)]/35 py-2 px-3 text-white font-medium text-md cursor-pointer"
                onClick={() => { setVendorType(0); setSorting(0); setDurations(0); }}>Reset</button>
                <button className="w-[calc(50%-10px)] rounded-full bg-[var(--primary)]/90 hover:bg-[var(--primary)] text-black py-2 px-3 font-medium text-md cursor-pointer"
                onClick={() => { fn([vendorType, sorting, durations]); closeFn(); }}>Confirm</button>
            </div>

        </div>
    )
};


export function AmountFilter({ fn, closeFn }: { fn: (arr: any) => void, closeFn: () => void }) {

    const [amt, setAmt] = useState("0");

    return (
        <div className="w-full h-full">
            <div className="w-full flex justify-between items-center px-4 py-3">
                <h3 className="text-white font-medium text-lg">Amount</h3>
                <button className="w-[21px] h-[21px] rounded-full bg-[var(--hover-bg)] flex items-center justify-center cursor-pointer"
                onClick={() => closeFn()}>
                    <AiOutlineClose className="w-[15px] h-[15px] text-white" />
                </button>
            </div>
            <div className="mt-2 px-4 py-3 w-full">
                <div className="gap-x-2 border border-[var(--border)] text-sm bg-[var(--hover-bg)] w-full p-3 text-[var(--text-grey)] rounded-md flex items-center justify-between">
                    <input id="Search" className="text-inherit w-[calc(100%-40px)] border-none outline-none" placeholder="Enter amount" 
                    type="" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmt(e.target.value)} />
                    <span className="text-sm text-white font-medium">AGR</span>
                </div>
            </div>

            <div className="flex justify-between items-center w-full sticky bottom-0 left-0 z-1 bg-[#121212] pt-4 pb-5 px-4 border-t border-t-[rgb(38,39,45)]">
                <button className="w-[calc(50%-10px)] rounded-full border border-[var(--border)] hover:bg-[var(--hover-bg)]/35 py-2 px-3 text-white font-medium text-md cursor-pointer"
                onClick={() => setAmt("0")}>Reset</button>
                <button className="w-[calc(50%-10px)] rounded-full bg-[var(--primary)]/90 hover:bg-[var(--primary)] text-black py-2 px-3 font-medium text-md cursor-pointer"
                onClick={() => { fn(amt); closeFn(); }}>Confirm</button>
            </div>

        </div>
    )
}