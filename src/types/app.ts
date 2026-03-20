import { BankType, OrderType } from ".";

export interface DBUserType {
    _id: string;
    name: string;
    profile: any;
    banner: any;
    password: string;
    email: string;
    id_verified: boolean;
    meta_data?: any;
    tokens: any[];
    banks: BankType[];
};

export const DEFAULT_USER = {
    _id: "",
    name: "",
    profile: null,
    banner: null,
    password: "",
    email: "",
    id_verified: false,
    meta_data: "",
    tokens: [],
    banks: [],
};

export interface CREATE_TOKEN_REQUEST_TYPE {
    tokenName: string,
    data: OrderType, 
    supply: number, 
    meta_data: any, 
    img: string
};

export interface TOKEN_PATCH_REQUEST_TYPE  {
    tokenName: string,
    param?: string,
    amount: number,
};