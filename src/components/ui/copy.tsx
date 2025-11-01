"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";

export default function Copy({ text, className } : { text: string, className?: string }) {

    const [copied, setCopied] = useState(false);
    
        if(!copied) { 
            return (
                <MdContentCopy className={`cursor-pointer ${className} text-[rgba(255,255,255,0.9)]`}
                onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(text);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    } catch (err) {
                        // 
                    }
                }} /> 
            )
        } else {
            return <FaCheck className={`${className} text-[rgba(68,231,68,0.72)]`} />
        }
}