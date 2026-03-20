"use client";

import { MdContentCopy } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function AccountAbout() {
    

    return (
        <div className="w-full p-3 sm:p-4 bg-[#181818] max-sm:text-[13px]" id="account_settings">
            <div className="w-full flex flex-col gap-y-6 px-3">
                <div className="py-1 sm:hidden">
                    <div className="w-full px-3 pt-4 pb-7 flex flex-col items-center border-b border-b-[rgb(38,39,45)]">
                        <div className="w-[120px] h-[120px] rounded-full bg-white/60"></div>
                        <div className="flex flex-col items-center gap-y-1 mt-4">
                            <h3 className="font-bold text-xl">Jonathan Doe</h3>
                            <span className="text-sm text-white/60">GreenLife Ltd.</span>
                        </div>
                    </div>
                    <div className="w-full border-b border-b-[var(--border)] py-3 px-5 flex justify-between items-center">
                        <span className="text-sm">Asset Tokens</span>
                        <span className="text-lg font-medium">5</span>
                    </div>
                    <div className="w-full border-b border-b-[var(--border)] py-3 px-5 flex justify-between items-center">
                        <span className="text-sm">Tokens Created</span>
                        <span className="text-lg font-medium">20</span>
                    </div>
                    <div className="w-full border-b border-b-[var(--border)] py-3 px-5 flex justify-between items-center">
                        <span className="text-sm">Verified</span>
                        <RiVerifiedBadgeFill className="w-[19px] h-[19px] text-[var(--text-green)]/75" />
                    </div>
                    <div className="w-fit max-w-full py-3 px-3 mt-3">
                        <div className="w-full border border-white/24 p-3 rounded-sm flex gap-x-4">
                            <span className="text-[13px] truncate text-white/75">https://localhost:3000/0.0.51426272</span>
                            <MdContentCopy className="w-[19px] h-[19px] text-white/60" />
                        </div>
                    </div>
                </div>
                
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-y-3 gap-x-4">
                    <div className="flex flex-col gap-y-3 w-full sm:w-48/100">
                        <label className="font-medium text-sm">Email: <span className="text-white/75">osatohanmen1@gmail.com</span></label>
                    </div>
                    <div className="flex flex-col gap-y-3 w-full sm:w-48/100">
                        <label className="font-medium text-sm">Phone: <span className="text-white/75">+234 906 573 6790</span></label>
                    </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-y-3 gap-x-4">
                    <div className="flex flex-col gap-y-3 w-full sm:w-48/100">
                        <label className="font-medium text-sm">Nationality: <span className="text-white/75">Nigerian</span></label>
                    </div>
                    <div className="flex flex-col gap-y-3 w-full sm:w-48/100">
                        <label className="font-medium text-sm">State: <span className="text-white/75">Lagos State</span></label>
                    </div>
                </div>
                
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-y-3 gap-x-4">
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-medium text-sm">About Me</label>
                    </div>
                </div>
                
                <div className="w-full flex flex-col">
                    <div className="w-full flex flex-row justify-between gap-x-4">
                        <h3 className="font-semibold text-white/95">Bank details</h3>
                    </div>

                    <div className="w-full items-center justify-between gap-x-2 mt-3 mb-2 hidden sm:flex">

                        <span className="text-sm text-white/80">SN</span>

                        <div className="flex flex-col gap-y-3 w-[calc(33%-5px)]">
                            <label className="font-medium text-sm text-white/80">Bank</label>
                        </div>
                        <div className="flex flex-col gap-y-3 w-[calc(33%-5px)]">
                            <label className="font-medium text-sm text-white/80">Account Name</label>
                        </div>
                        <div className="flex flex-col gap-y-3 w-[calc(33%-5px)]">
                            <label className="font-medium text-sm text-white/80">Account Number</label>
                        </div>
                    </div>

                    <div className="w-full">
                        {
                            (Array(3).fill(0)).map((_: any, i: number) => (
                                <div className="w-full flex justify-betwee gap-y-3 gap-x-2 py-3 border-b border-b-[var(--border)]" key={`bank-${i+12}`}>

                                    <span className="text-sm text-white/80">{i+1}.</span>
                                    
                                    <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-x-4 gap-y-2">
                                        <div className="flex flex-col gap-y-3 w-full sm:w-[calc(33%-5px)]">
                                            <label className="font-medium text-[13px] text-white/85">Bank</label>
                                            {/* <div className="w-full select-wrapper relative border border-[var(--border)] rounded-sm text-sm">
                                                <select className="w-full p-3 rounded-sm bg-inherit text-inherit">
                                                    <option className="w-full p-3" disabled selected hidden>Bank</option>
                                                    <option className="w-full p-3">GTBank (Guarantee Trust Bank)</option>
                                                    <option className="w-full p-3">First Bank</option>
                                                    <option className="w-full p-3">Wema Bank</option>
                                                    <option className="w-full p-3">Kuda Bank</option>
                                                    <option className="w-full p-3">Opay</option>
                                                    <option className="w-full p-3">Palm Pay</option>
                                                </select>
                                            </div> */}
                                        </div>
                                        <div className="flex flex-col gap-y-3 w-full sm:w-[calc(33%-5px)]">
                                            <label className="font-medium text-[13px] text-white/85">Account Name</label>
                                        </div>
                                        <div className="flex flex-col gap-y-3 w-full sm:w-[calc(33%-5px)]">
                                            <label className="font-medium text-[13px] text-white/85">Account Number</label>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}