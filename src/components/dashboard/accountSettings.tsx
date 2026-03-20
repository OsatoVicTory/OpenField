"use client";

import { AppContext } from "@/context/app";
import { DBUserType } from "@/types/app";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { MdEdit, MdEditDocument } from "react-icons/md";
import { Spinner } from "../ui/loading";
import Image from "next/image";
import { imageToBase64 } from "@/utils/helpers";
// import { deleteFileCloudinary, uploadToCloudinary } from "@/actions/cloudinary";
// import { updateUser } from "@/actions/user";

export default function AccountSettings() {

    const { user, setUser } = useContext(AppContext);
    const [data, setData] = useState<DBUserType>(user);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [file, setFile] = useState<any>({ file: null, banner: null });
    const profileUrl = useRef("");
    const bannerUrl = useRef("");

    function handleBankChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
        const { value, name } = e.target;
        
        const newBanks = data.banks.map((p, idx) => {
            if(idx === i) return { ...p, [name]: value };
            else return p;
        });
        setData({ ...data, banks: newBanks });
    };

    function addBank() {
        const newBanks = [...data.meta_data.banks, {
            bank_name: "",
            account_name: "",
            account_number: "",
        }];
        setData({ ...data, banks: newBanks });
    };

    function filterBanks(index: number) {
        const newBanks = data.banks.filter((_, i) => i !== index);
        setData({ ...data, banks: newBanks });
    };

    const handleSubmit = async () => {
        try {
            setUpdateLoading(true);
            // let profile = user.profile, banner = user.banner;
            // if(file.profile) profile = await imageToBase64(file.profile);
            // if(file.banner) banner = await imageToBase64(file.banner);

            // if(file.profile) {
            //     if(user.profile.public_id) await deleteFileCloudinary(user.profile.public_id);
            //     const { secure_url, public_id } = await uploadToCloudinary(profile);
            //     profile = { img: secure_url, public_id };
            // }

            // if(file.banner) {
            //     if(user.banner.public_id) await deleteFileCloudinary(user.banner.public_id);
            //     const { secure_url, public_id } = await uploadToCloudinary(banner);
            //     banner = { img: secure_url, public_id };
            // }

            // await updateUser(user._id, { ...data, profile, banner });

            // setUser({ ...data, profile, banner });
            // setUpdateLoading(false);
        } catch (err) {
            setUpdateLoading(false);
        }
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { value, name } = e.target;
        setData({ ...data, meta_data: { ...data.meta_data.meta_data, [name]: value } });
    };

    function FileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(!e.target.files) return;
        const file_ = e.target.files[0];
        setFile({ ...file, [e.target.name]: file_ });
    };

    const profileUrl_ = useMemo(() => {
        if(file.profile) {
            URL.revokeObjectURL(profileUrl.current);
            const url = URL.createObjectURL(file.profile);
            profileUrl.current = url;
            return url;
        }
        return "";
    }, [file.profile?.name]);

    const bannerUrl_ = useMemo(() => {
        if(file.banner) {
            URL.revokeObjectURL(bannerUrl.current);
            const url = URL.createObjectURL(file.banner);
            profileUrl.current = url;
            return url;
        }
        return "";
    }, [file.banner?.name]);
    

    return (
        <div className="w-full md:w-[min(95%,800px)] flex flex-col md:flex-row max-lg:gap-6 lg:gap-x-12 p-3 sm:px-6 bg-[#181818] max-sm:text-[13px]" id="account_settings">
            <div className="flex-col flex gap-y-3 w-full md:w-fit items-center">
                <label className="font-medium text-sm">Profile photo</label>
                <div className="w-[120px] h-[120px] rounded-full relative overflow-hidden">
                    {
                        file.profile
                        ?
                        <Image src={profileUrl_} alt={"profile_img_edit"} fill sizes="(max-width: 768px) 300px, 200px" />
                        :
                        <div className="w-full h-full bg-[var(--hover-bg)]"></div>
                    }
                    <input type="file" onChange={FileChange} name="profile" hidden id="profile-input-file" />
                    <label htmlFor="profile-input-file" className="absolute z-1 bottom-0 right-0 p-3 bg-white/60 rounded-full cursor-pointer">
                        <MdEdit className="text-white/85 w-5 h-5" />
                    </label>
                </div>
                
                <label className="font-medium text-sm">Banner photo</label>
                <div className="w-[120px] h-[120px] rounded-full relative overflow-hidden">
                    {
                        file.banner
                        ?
                        <Image src={bannerUrl_} alt={"banner_img_edit"} fill sizes="(max-width: 768px) 300px, 200px" />
                        :
                        <div className="w-full h-full bg-[var(--hover-bg)]"></div>
                    }
                    <input type="file" onChange={FileChange} name="banner" hidden id="banner-input-file" />
                    <label htmlFor="banner-input-file" className="absolute z-1 bottom-0 right-0 p-3 bg-white/60 rounded-full cursor-pointer">
                        <MdEdit className="text-white/85 w-5 h-5" />
                    </label>
                </div>
            </div>

            <form className="w-full md:w-[min(95%,580px)] flex flex-col gap-y-6 px-3" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-medium text-sm">First Name</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter first name"
                        name="first_name" onChange={handleChange} value={data.meta_data.first_name||""} required />
                    </div>
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-medium text-sm">Last Name</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter last name"
                        name="last_name" onChange={handleChange} value={data.meta_data.last_name||""} required />
                    </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-y-4 gap-x-4">
                    <div className="flex flex-col gap-y-3 w-full sm:w-[calc(27%-8px)]">
                        <label className="font-medium text-sm">Your Title</label>
                        <div className="w-full select-wrapper relative border border-[var(--border)] rounded-sm text-sm">
                            <select className="w-full p-3 rounded-sm bg-inherit text-inherit"
                            name="title" onChange={handleChange} defaultValue={data.meta_data.title || "Title"}>
                                <option className="w-full p-3" disabled selected hidden>Title</option>
                                <option className="w-full p-3">MR</option>
                                <option className="w-full p-3">MRS</option>
                                <option className="w-full p-3">MASTER</option>
                                <option className="w-full p-3">MISS</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 w-full sm:w-[calc(33%-8px)]">
                        <label className="font-medium text-sm">Gender</label>
                        <div className="w-full select-wrapper relative border border-[var(--border)] rounded-sm text-sm">
                            <select className="w-full p-3 rounded-sm bg-inherit text-inherit" required
                            name="gender" onChange={handleChange} defaultValue={data.meta_data.gender || "Gender"}>
                                <option className="w-full p-3" disabled selected hidden>Gender</option>
                                <option className="w-full p-3">Male</option>
                                <option className="w-full p-3">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 w-full sm:w-[calc(39%-8px)]">
                        <label className="font-medium text-sm">Marital Status</label>
                        <div className="w-full select-wrapper relative bg-inherit border border-[var(--border)] rounded-sm text-sm">
                            <select className="w-full p-3 rounded-sm bg-inherit text-inherit"
                            name="marital_status" onChange={handleChange} defaultValue={data.meta_data.marital_status || "Marital status"}>
                                <option className="w-full p-3" disabled selected hidden>Marital status</option>
                                <option className="w-full p-3">Married</option>
                                <option className="w-full p-3">Single</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-medium text-sm">Email Address</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter email"
                        type="email" name="email" onChange={handleChange} value={data.meta_data.email||""} required />
                    </div>
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-medium text-sm">Phone Number</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter mobile number" 
                        type="number" name="number" onChange={handleChange} value={data.meta_data.number||0} required  />
                    </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-y-3 gap-x-4">
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-medium text-sm">Nationality</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter your country"
                        name="country" onChange={handleChange} value={data.meta_data.country||""} required  />
                    </div>
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-medium text-sm">State/City</label>
                        <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="State or city or province" 
                        name="state" onChange={handleChange} value={data.meta_data.state||""} required  />
                    </div>
                </div>
                
                <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-y-3 gap-x-4">
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-medium text-sm">About Me</label>
                        <textarea className="w-full p-3 border border-[var(--border)] rounded-sm text-white/85 field-sizing-content h-fit resize-none min-h-[100px]" 
                        placeholder="Write about yourself" name="about" onChange={handleChange} value={data.meta_data.about||""}  />
                    </div>
                </div>
                
                <div className="w-full flex flex-col">
                    <div className="w-full flex flex-row justify-between gap-x-4">
                        <h3 className="font-sm font-semibold text-white/80">Bank details</h3>

                        <button className="w-fit p-1 cursor-pointer rounded-[1px] hover:bg-[var(--hover-bg)]" onClick={addBank}>
                            <AiOutlinePlus className="w-4 h-4 text-[var(--text-grey)]" />
                        </button>
                    </div>

                    <div className="w-full items-center justify-between gap-x-2 mt-3 mb-2 hidden sm:flex">
                        <div className="w-fit p-1">
                            <IoMdTrash className="w-5 h-5 text-[var(--text-grey)] opacity-[0]" />
                        </div>
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
                            data.banks.map((bank: any, i: number) => (
                                <div className="w-full flex justify-betwee gap-y-3 gap-x-2 items-center py-3 border-b border-b-[var(--border)]" key={`bank-${i+12}`}>

                                    {i > -1 && <button className="w-fit p-1 cursor-pointer rounded-[1px] bg-[var(--hover-bg)]/50 hover:bg-[var(--hover-bg)]"
                                    onClick={() => filterBanks(i)}>
                                        <IoMdTrash className="w-4 h-4 text-[var(--text-grey)]" />
                                    </button>}
                                    
                                    <div className="w-full flex flex-col sm:flex-row lg:justify-between gap-x-4 gap-y-3">
                                        <div className="flex flex-col gap-y-3 w-full sm:w-[calc(33%-5px)]">
                                            {/* <label className="font-medium text-sm">Bank</label> */}
                                            <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" placeholder="Enter bank name"
                                            onChange={(e) => handleBankChange(e, i)} name="bank_name" value={bank.bank_name} />
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
                                            onChange={(e) => handleBankChange(e, i)} name="account_name" value={bank.account_name} />
                                        </div>
                                        <div className="flex flex-col gap-y-3 w-full sm:w-[calc(33%-5px)]">
                                            {/* <label className="font-medium text-sm">Account Number</label> */}
                                            <input className="w-full p-3 border border-[var(--border)] rounded-sm text-sm" type="number" placeholder="Enter account number"
                                            onChange={(e) => handleBankChange(e, i)} name="account_number" value={bank.account_number} />
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="w-full flex justify-center p-4 items-center">
                    <button className={`w-fit rounded-full flex items-center py-3 px-8 gap-x-2 text-white font-bold text-sm ${updateLoading ? "cursor-not-allowed bg-[var(--primary)]/65" : "cursor-pointer bg-[var(--primary)] hover:bg-[var(--primary)]/80"}`}
                    type="submit">
                        {
                            updateLoading
                            ?
                            <Spinner className="w-[20px] h-[20px] border-[3.6px]" />
                            :
                            <MdEditDocument className="w-[20px] h-[19px] text-white/85" />
                        }
                        <span>{updateLoading ? "Updating" : "Update"}</span>
                    </button>
                </div>

            </form>
        </div>
    )
}