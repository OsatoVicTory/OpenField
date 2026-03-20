"use client";

import { BankType, Default_P2PAgent, P2PAgents } from "@/types";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";

export default function AccountAgentSettings() {

    const [agent, setAgent] = useState<P2PAgents>(Default_P2PAgent);

    function handleBankChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
        const { value, name } = e.target;
        setAgent((prev) => {
            const newVal = prev.payments.map((p, idx) => {
                if(idx === i) return { ...p, [name]: value };
                else return p;
            })
            return { ...prev, payments: newVal };
        });
    };

    function addBank() {
        setAgent((prev) => {
            return { 
                ...prev, 
                payments: [...prev.payments, {
                    bank_name: "",
                    account_name: "",
                    account_number: "",
                }], 
            };
        });
    };

    function filterBanks(index: number) {
        setAgent((prev) => {
            return { 
                ...prev, 
                payments: prev.payments.filter((_, i) => i !== index), 
            };
        });
    };
    

    return (
        <div className="w-full md:w-[min(95%,650px)] flex flex-col md:flex-row max-lg:gap-6 lg:gap-x-12 py-3 max-sm:text-[13px]" id="account_settings">
            

            <div className="w-full flex flex-col gap-y-6 px-0">
                <div className="w-full flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-medium text-sm">Agent Name</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter first name" />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-y-6">

                    <div className="w-full flex flex-row justify-between gap-x-4">
                        <h3 className="font-sm font-semibold text-white/80">Token Details</h3>

                        <button className="w-fit p-1 cursor-pointer rounded-[1px] hover:bg-[var(--hover-bg)]" onClick={addBank}>
                            <AiOutlinePlus className="w-4 h-4 text-[var(--text-grey)]" />
                        </button>
                    </div>
                    

                    {
                        agent.payments.map((_: any, i: number) => (
                            <div className="w-full flex flex-col justify-between gap-y-3 gap-x-3 px-3 md:px-6 py-3 md:py-4 rounded-[3] bg-[var(--hover-bg)]/12 border border-[var(--border)]" key={`bank-${i+12}`}>

                                {i > -1 && <div className="w-full flex justify-end items-center pb-1 mt-[-3px]">
                                    <button className="w-fit h-fit p-1 cursor-pointer rounded-[1px] bg-[var(--hover-bg)]/50 hover:bg-[var(--hover-bg)]"
                                    onClick={() => filterBanks(i)}>
                                        <IoMdTrash className="w-3 h-3 text-[var(--text-grey)]" />
                                    </button>
                                </div>}
                                
                                    
                                <div className="w-full flex flex-col lg:justify-between mt-[-8px] gap-x-4 gap-y-3">
                                    <div className="w-full flex flex-col gap-y-3 md:flex-row justify-between">
                                        <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-y-3">
                                            <label className="font-medium text-sm">Token Name</label>
                                            <div className="w-full select-wrapper relative border border-[var(--border)] rounded-sm text-sm">
                                                <select className="w-full p-3 rounded-sm bg-inherit text-inherit">
                                                    <option className="w-full p-3" disabled selected hidden>Token</option>
                                                    <option className="w-full p-3">USDT</option>
                                                    <option className="w-full p-3">USDC</option>
                                                    <option className="w-full p-3">ETH</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-[calc(50%-10px)] flex flex-col sm:flex-row lg:justify-between gap-y-4 gap-x-4">
                                            <div className="flex flex-col gap-y-3 w-full">
                                                <label className="font-medium text-sm">Payment Time (in mins)</label>
                                                <div className="w-full select-wrapper relative border border-[var(--border)] rounded-sm text-sm">
                                                    <select className="w-full p-3 rounded-sm bg-inherit text-inherit">
                                                        <option className="w-full p-3" disabled selected hidden>30</option>
                                                        <option className="w-full p-3">10</option>
                                                        <option className="w-full p-3">20</option>
                                                        <option className="w-full p-3">30</option>
                                                        <option className="w-full p-3">45</option>
                                                        <option className="w-full p-3">60</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col gap-y-3">
                                        <div className="flex flex-col gap-y-3 w-full">
                                            <label className="font-medium text-sm">Amount</label>
                                            <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="E.g 1.20 USD" />
                                        </div>
                                        <div className="flex flex-col gap-y-3 w-full">
                                            <label className="font-medium text-sm">Quantity</label>
                                            <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="number" placeholder="E.g 4230 AGR" />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-y-3">
                                        <div className="flex flex-col gap-y-3 w-full">
                                            <label className="font-medium text-sm">Lower limits</label>
                                            <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="number" placeholder="E.g 1.20 USD" />
                                        </div>
                                        <div className="flex flex-col gap-y-3 w-full">
                                            <label className="font-medium text-sm">Upper limits</label>
                                            <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="number" placeholder="E.g 1.20 USD" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
                <div className="w-full flex flex-col">
                    <div className="w-full flex flex-row justify-between gap-x-4">
                        <h3 className="font-sm font-semibold text-white/80">Bank details</h3>

                        <button className="w-fit p-1 cursor-pointer rounded-[1px] hover:bg-[var(--hover-bg)]" onClick={addBank}>
                            <AiOutlinePlus className="w-4 h-4 text-[var(--text-grey)]" />
                        </button>
                    </div>

                    <div className="w-full">
                        {
                            agent.payments.map((_: any, i: number) => (
                                <div className="w-full flex justify-between gap-y-3 gap-x-2 items-center py-3 border-b border-b-[var(--border)]" key={`bank-${i+12}`}>

                                    {i > -1 && <button className="w-fit p-1 cursor-pointer rounded-[1px] bg-[var(--hover-bg)]/50 hover:bg-[var(--hover-bg)]"
                                    onClick={() => filterBanks(i)}>
                                        <IoMdTrash className="w-4 h-4 text-[var(--text-grey)]" />
                                    </button>}
                                    
                                    <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-x-4 gap-y-3">
                                        <div className="flex flex-col gap-y-3 w-full sm:w-[calc(33%-5px)]">
                                            {/* <label className="font-medium text-sm">Bank</label> */}
                                            <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter bank name"
                                            onChange={(e) => handleBankChange(e, i)} name="bank_name" />
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
                                            {/* <label className="font-medium text-sm">Account Name</label> */}
                                            <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="number" placeholder="Enter account number"
                                            onChange={(e) => handleBankChange(e, i)} name="account_name" />
                                        </div>
                                        <div className="flex flex-col gap-y-3 w-full sm:w-[calc(33%-5px)]">
                                            {/* <label className="font-medium text-sm">Account Number</label> */}
                                            <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="number" placeholder="Enter account number"
                                            onChange={(e) => handleBankChange(e, i)} name="account_number" />
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="w-full flex justify-center p-4 items-center">
                    <button className={`w-fit rounded-full flex items-center cursor-pointer py-3 px-8 text-white bg-[var(--primary)] font-medium text-sm`}>
                        <span>Update</span>
                    </button>
                </div>

            </div>
        </div>
    )
}