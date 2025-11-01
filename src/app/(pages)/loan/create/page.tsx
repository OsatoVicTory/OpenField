"use client";

import { FormEvent } from "react";
import { IoCheckbox } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export default function LoanForm() {

    const loans_range = ["1K - 10K", "10K - 100K", "100K - 1M", "1M - 10M", "10M - 100M", "100M - 1B", "1B+"];

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
    };

    return (
        <div className="w-full">
            <div className="bg-[#121212] px-4 sm:px-7 py-5 flex justify-center">
                <div className="w-full w-full max-w-full lg:w-[984px]">
                    <h2 className="text-xl text-white font-bold">Loan Application Form</h2>
                    <form className="w-full mt-6 flex flex-col gap-y-6 max-sm:text-sm" onSubmit={handleSubmit}>

                        <div className="w-full flex flex-col border border-[var(--border)] rounded-md">
                            <div className="w-full px-3 py-4 border-b border-b-[rgb(38,39,45)]">
                                <span className="text-white/75">Loan ranges available</span>
                                {/* <input className="w-full p-3 rounded-md text-inherit bg-[rgba(255,255,255,0.02)] border border-[var(--border)] text-white/75" 
                                placeholder="Search eligible loans" type="number" /> */}
                            </div>
                            <div className="w-full flex flex-col mt-2">
                                {loans_range.map((l, i) => (
                                    <div className="w-full flex justify-between items-center gap-x-2 p-3 sm:pl-4 not-last:border-b border-b-[rgb(38,39,45)]"
                                    key={`loan-range-${i}`}>
                                        <div className="flex items-end gap-x-1 sm:gap-x-2 w-[calc(100%-55px)]">
                                            <span className="inline-block text-lg max-[400px]:text-md sm:text-2xl font-medium">{l}</span>
                                            <span className="w-fit text-sm text-white/60 min-[400px]:pb-[3px]">AGR</span>
                                        </div>

                                        <button className="w-fit flex items-center cursor-pointer">
                                            {
                                                i === 3 ?
                                                <IoCheckbox className="w-[33px] h-[24px] text-white" />
                                                :
                                                <MdOutlineCheckBoxOutlineBlank className="w-[33px] h-[24px] text-white/50" />
                                            }
                                        </button>
                                        {/* <div className="select-wrapper rounded-sm relative w-[180px] lg:w-33/100 max-[400px]:w-[148px] bg-[#282828] text-white/85">
                                            <select className="w-full p-3 max-[400px]:px-2 rounded-sm bg-inherit text-inherit max-[400px]:text-xs">
                                                <option className="w-full p-3" disabled selected hidden>Loan Tenure</option>
                                                <option className="w-full p-3">6 Months @ 15% p.m</option>
                                                <option className="w-full p-3">12 Months @ 14% p.m</option>
                                                <option className="w-full p-3">2 years @ 13% p.a</option>
                                                <option className="w-full p-3">3 years @ 12.5% p.a</option>
                                                <option className="w-full p-3">5 years @ 12% p.a</option>
                                                <option className="w-full p-3">7 years @ 11% p.a</option>
                                                <option className="w-full p-3">10 years @ 10% p.a</option>
                                            </select>
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <>
                            <div className="w-full mt-3 flex flex-col gap-y-5 lg:gap-x-3 lg:flex-row lg:justify-between">
                                <div className="w-full select-wrapper rounded-sm relative lg:w-[calc(33%-5px)] bg-[#282828] text-white/85">
                                    <select className="w-full p-3 rounded-sm bg-inherit text-inherit">
                                        <option className="w-full p-3" disabled selected hidden>Loan/Credit Facility</option>
                                        <option className="w-full p-3">Personal Loans</option>
                                        <option className="w-full p-3">Trading Finance</option>
                                        <option className="w-full p-3">Product Finance</option>
                                        <option className="w-full p-3">Capital Funds</option>
                                    </select>
                                </div>

                                <div className="w-full rounded-sm relative lg:w-[calc(33%-5px)] bg-[#282828] text-white/85">
                                    <input className="w-full p-3 text-inherit" placeholder="Enter specific loan amount" />
                                </div>

                                <div className="w-full select-wrapper rounded-sm relative lg:w-[calc(33%-5px)] bg-[#282828] text-white/85">
                                    <select className="w-full p-3 max-[400px]:px-2 rounded-sm bg-inherit text-inherit max-[400px]:text-xs">
                                        <option className="w-full p-3" value="" disabled selected hidden>Loan Tenure</option>
                                        <option className="w-full p-3">6 Months @ 15% p.m</option>
                                        <option className="w-full p-3">12 Months @ 14% p.m</option>
                                        <option className="w-full p-3">2 years @ 13% p.a</option>
                                        <option className="w-full p-3">3 years @ 12.5% p.a</option>
                                        <option className="w-full p-3">5 years @ 12% p.a</option>
                                        <option className="w-full p-3">7 years @ 11% p.a</option>
                                        <option className="w-full p-3">10 years @ 10% p.a</option>
                                    </select>
                                </div>
                            </div>

                            <div className="w-full">
                                <textarea className="w-full p-3 bg-[#282828] rounded-sm text-white/85 field-sizing-content h-fit resize-none min-h-[100px]" placeholder="Loan Purpose" />
                            </div>
                        </>

                    </form>
                </div>
            </div>
            <div className="bg-[#121212] px-4 sm:px-7 py-4 flex w-full sticky bottom-0 right-0 z-6 items-center justify-between border-t border-t-[rgb(38,39,45)] shadow-[var(--message-footer-card)]">
                <span className="text-sm text-white/75">Complete and Submit</span>
                <button className={`w-fit rounded-full flex items-center cursor-pointer py-3 px-6 text-white bg-[var(--primary)] font-medium text-sm`}>
                    <span>Submit</span>
                </button>
            </div>
        </div>
    )
}