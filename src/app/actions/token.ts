import { CREATE_TOKEN_REQUEST_TYPE, TOKEN_PATCH_REQUEST_TYPE } from "@/types/app";

const URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const filterTokens = async (_id: string, pageSize: number, filter: any) => { 
    
    const res = await fetch(`${URL}/api/token`, {
        method: "POST",
        body: JSON.stringify({ _id, pageSize, filter }),
    });
    const json = await res.json();
    return json.data;
};


export const createToken = async (data: CREATE_TOKEN_REQUEST_TYPE) => { 
    
    const res = await fetch(`${URL}/api/token`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    const json = await res.json();
    return json.data;
};


export const burnToken = async (data: TOKEN_PATCH_REQUEST_TYPE) => { 
    
    const res = await fetch(`${URL}/api/token`, {
        method: "PATCH",
        body: JSON.stringify({ ...data, param: "BURN" }),
    });
    const json = await res.json();
    return json.data;
};


export const mintToken = async (data: TOKEN_PATCH_REQUEST_TYPE) => { 
    
    const res = await fetch(`${URL}/api/token`, {
        method: "PATCH",
        body: JSON.stringify({ ...data, param: "MINT" }),
    });
    const json = await res.json();
    return json.data;
};