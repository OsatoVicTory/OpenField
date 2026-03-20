
const URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const createAgent = async (data: any): Promise<any> => {
    const res = await fetch(`${URL}/api/p2p/agent`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    const json = await res.json();
    return json.data;
};

export const updateAgent = async (_id: string, data: any): Promise<any> => {
    const res = await fetch(`${URL}/api/p2p/agent`, {
        method: "PATCH",
        body: JSON.stringify({ ...data, req_type: "UPDATE" }),
    });
    const json = await res.json();
    return json.data;
};

export const verifyAgent = async (_id: string, data: any): Promise<any> => {
    const res = await fetch(`${URL}/api/p2p/agent`, {
        method: "PATCH",
        body: JSON.stringify({ ...data, req_type: "VERIFY" }),
    });
    const json = await res.json();
    return json.data;
};


export const filterAgents = async (_id: string, data: any): Promise<any[]> => {
    const res = await fetch(`${URL}/api/p2p/agent?_id=${_id}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    const json = await res.json();
    return json.data;
};


export const sendAgentChat = async (_id1: string, _id2: string, message: any) => { 
    const res = await fetch(`${URL}/api/p2p/chats?_id1=${_id1}&_id2=${_id2}`, {
        method: "POST",
        body: JSON.stringify(message),
    });
    const json = await res.json();
    return json.data;
};


export const fetchAgentChats = async (_id1: string, _id2: string) => { 
    const res = await fetch(`${URL}/api/p2p/chats?_id1=${_id1}&_id2=${_id2}`, {
        method: "GET",
    });
    const json = await res.json();
    return json.data;
};