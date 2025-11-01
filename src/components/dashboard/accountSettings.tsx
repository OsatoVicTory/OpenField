"use client";

export default function AccountSettings() {
    // const v = [
    //     {label: "First Name", placeholder: "Enter First Name"},
    //     {label: "First Name", placeholder: "Enter First Name"},
    //     {label: "First Name", placeholder: "Enter First Name"},
    //     {label: "First Name", placeholder: "Enter First Name"},
    //     {label: "First Name", placeholder: "Enter First Name"},
    //     {label: "First Name", placeholder: "Enter First Name"},
    //     {label: "First Name", placeholder: "Enter First Name"},
    // ]
    return (
        <div className="w-full p-4 bg-[#181818]" id="account_settings">
            <div className="w-full flex flex-col gap-y-7 px-3">
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-x-4">
                    <div className="flex flex-col gap-y-3 w-48/100">
                        <label className="font-medium text-sm">First Name</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter first name" />
                    </div>
                    <div className="flex flex-col gap-y-3 w-48/100">
                        <label className="font-medium text-sm">Last Name</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter last name" />
                    </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-x-4">
                    <div className="flex flex-col gap-y-3 w-[calc(25%-8px)]">
                        <label className="font-medium text-sm">Your Title</label>
                        <div className="w-full select-wrapper relative border border-[var(--border)] rounded-sm text-sm">
                            <select className="w-full p-3 rounded-sm bg-inherit text-inherit">
                                <option className="w-full p-3" disabled selected hidden>Title</option>
                                <option className="w-full p-3">MR</option>
                                <option className="w-full p-3">MRS</option>
                                <option className="w-full p-3">MASTER</option>
                                <option className="w-full p-3">MISS</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 w-[calc(33%-8px)]">
                        <label className="font-medium text-sm">Gender</label>
                        <div className="w-full select-wrapper relative border border-[var(--border)] rounded-sm text-sm">
                            <select className="w-full p-3 rounded-sm bg-inherit text-inherit">
                                <option className="w-full p-3" disabled selected hidden>Gender</option>
                                <option className="w-full p-3">Male</option>
                                <option className="w-full p-3">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 w-[calc(33%-8px)]">
                        <label className="font-medium text-sm">Marital Status</label>
                        <div className="w-full select-wrapper relative bg-inherit border border-[var(--border)] rounded-sm text-sm">
                            <select className="w-full p-3 rounded-sm bg-inherit text-inherit">
                                <option className="w-full p-3" disabled selected hidden>Marital status</option>
                                <option className="w-full p-3">Married</option>
                                <option className="w-full p-3">Single</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-x-4">
                    <div className="flex flex-col gap-y-3 w-48/100">
                        <label className="font-medium text-sm">Email Address</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="email" placeholder="Enter email" />
                    </div>
                    <div className="flex flex-col gap-y-3 w-48/100">
                        <label className="font-medium text-sm">Phone Number</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="number" placeholder="Enter mobile number" />
                    </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-x-4">
                    <div className="flex flex-col gap-y-3 w-48/100">
                        <label className="font-medium text-sm">Nationality</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter your country" />
                    </div>
                    <div className="flex flex-col gap-y-3 w-48/100">
                        <label className="font-medium text-sm">State/City</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="State or city or province" />
                    </div>
                </div>
                
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-x-4">
                    <div className="flex flex-col gap-y-3 w-[calc(25%-8px)]">
                        <label className="font-medium text-sm">Bank</label>
                        <div className="w-full select-wrapper relative border border-[var(--border)] rounded-sm text-sm">
                            <select className="w-full p-3 rounded-sm bg-inherit text-inherit">
                                <option className="w-full p-3" disabled selected hidden>Bank</option>
                                <option className="w-full p-3">GTBank (Guarantee Trust Bank)</option>
                                <option className="w-full p-3">First Bank</option>
                                <option className="w-full p-3">Wema Bank</option>
                                <option className="w-full p-3">Kuda Bank</option>
                                <option className="w-full p-3">Opay</option>
                                <option className="w-full p-3">Palm Pay</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 w-[calc(41%-8px)]">
                        <label className="font-medium text-sm">Account Name</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="number" placeholder="Enter account number" />
                    </div>
                    <div className="flex flex-col gap-y-3 w-[calc(33%-8px)]">
                        <label className="font-medium text-sm">Account Number</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="number" placeholder="Enter account number" />
                    </div>
                </div>
                
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-x-4">
                    <div className="flex flex-col gap-y-3 w-39/100">
                        <label className="font-medium text-sm">Date of Birth</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="date" placeholder="Enter birth date" />
                    </div>
                    <div className="flex flex-col gap-y-3 w-60/100">
                        <label className="font-medium text-sm">About Me</label>
                        <textarea className="w-full p-3 border border-[var(--border)]  rounded-sm text-white/85 field-sizing-content h-fit resize-none min-h-[100px]" placeholder="Write about yourself" />
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