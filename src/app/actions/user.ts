
const URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const createUser = async (data: any): Promise<any> => {
    const res = await fetch(`${URL}/api/user`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    const json = await res.json();
    return json.data;
};


export const updateUser = async (_id: string, data: any): Promise<any> => {
    const res = await fetch(`${URL}/api/user`, {
        method: "PATCH",
        body: JSON.stringify({ ...data, _id }),
    });
    const json = await res.json();
    return json.data;
};


export const logUserIn = async (data: any): Promise<any> => {
    const res = await fetch(`${URL}/api/user`, {
        method: "POST",
        body: JSON.stringify({ ...data, param: "LOGIN" }),
    });
    const json = await res.json();
    return json.data;
};

export const verifyUser = async (data: any): Promise<any> => {
    const res = await fetch(`${URL}/api/user`, {
        method: "POST",
        body: JSON.stringify({ ...data, param: "VERIFY" }),
    });
    const json = await res.json();
    return json.data;
};