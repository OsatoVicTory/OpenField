import useClickOutside from "@/hooks/useClickOutside";
import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function LoanModal({ loan, closeFn }: { loan: any, closeFn: () => void }) {

    const modalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(
        modalRef,
        closeFn,
        []
    );

    return (
        <div ref={modalRef}
        className={`w-screen min-[450px]:w-[400px] shadow-[var(--message-footer-card)] h-full fixed z-99 top-0 ${loan ? "right-0" : "-right-[100%] min-[450px]:-right-[410px]"} transition-right duration-500 ease-in-out`}>
            <div className="w-full h-full bg-[#282828] overflow-y-auto">
                <header className="flex justify-end items-center p-3 sticky top-0 right-0 z-9 bg-[#303030]">
                    <button className="hover:bg-[var(--hover-bg)] p-2 rounded-sm cursor-pointer" onClick={closeFn}>
                        <AiOutlineClose className="w-[18px] h-[18px] text-white" />
                    </button>
                </header>
                <div className="w-full flex flex-col px-4 py-6 gap-y-4 text-sm max-[400px]:text-xs">
                    <h2 className="text-white text-xl sm:text-2xl font-medium">Loan ID: 10134983634</h2>

                    <div className={`flex items-center text-inherit gap-x-2`}>
                        <span className="text-white/36">Loan Amount:</span>
                        <span className="ml-2" title="345690.45">345.69K</span>
                        <span className="text-white/60">AGR</span>
                    </div>

                    <div className={`flex items-center text-inherit gap-x-2`}>
                        <span className="text-white/36">Application Date:</span>
                        <span className="">14/10/2025</span>
                    </div>

                    <div className={`flex items-center text-inherit gap-x-2`}>
                        <span className="text-white/36">Loan Start Date:</span>
                        <span className="">24/10/2025</span>
                    </div>

                    <div className={`flex items-center text-inherit gap-x-2`}>
                        <span className="text-white/36">Loan Duration:</span>
                        <span className="capitalize">3 Years</span>
                    </div>

                    <div className={`flex items-center text-inherit gap-x-2`}>
                        <span className="text-white/36">Amount Paid per Month:</span>
                        <span className="ml-2" title="1,120.36">1.12K</span>
                        <span className="text-white/36">AGR</span>
                    </div>

                    <div className={`flex items-center text-inherit gap-x-2`}>
                        <span className="text-white/36">Interest Rate:</span>
                        <span className="">33%</span>
                    </div>

                    <div className={`flex items-center text-inherit gap-x-2`}>
                        <span className="text-white/36">Amount Paid:</span>
                        <span className="ml-2 text-[var(--text-green)] font-bold text-md">1,120,230.36</span>
                        <span className="text-white/36">AGR</span>
                    </div>

                    <div className={`flex items-center text-inherit gap-x-2`}>
                        <span className="text-white/36">Amount Left:</span>
                        <span className="ml-2 text-[var(--text-red)] font-bold text-md">906,000.12</span>
                        <span className="text-white/36">AGR</span>
                    </div>
                </div>

                <div className="w-full px-4 py-4">
                    <div className="w-full flex justify-between items-center px-1">
                        <span className="text-white/75 text-sm">Days Left</span>
                        <span className="text-white font-bold text-lg">1089</span>
                    </div>
                    <div className="w-full rounded-full bg-[var(--hover-bg)] h-[24px] overflow-hidden mt-2">
                        <div className="w-1/2 h-full bg-[var(--primary)]"></div>
                    </div>
                </div>

                <div className="w-full px-4 py-4">
                    {/* put pie chart of amount paid & amount left */}
                </div>
            </div>
        </div>
    )
}