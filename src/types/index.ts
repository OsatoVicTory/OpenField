export interface OrderType {
    price: number, 
    qty: number, 
    price_decimal: number,
    account_id: string,
    circulation_order: boolean
}

export interface P2PAgents {
    _id: string;
    name: string;
    payment_duration: number;
    completed_orders: number;
    orders: number;
    amt: string;
    lowerLimits: number;
    upperLimits: number;
    quantity: string;
    pos?: number;
    verified: boolean;
    payments: any[];
    instructions: string;
};

export const Default_P2PAgent = {
    _id: "",
    name: "",
    payment_duration: 0,
    completed_orders: 0,
    orders: 0,
    amt: "",
    lowerLimits: 0,
    upperLimits: 0,
    quantity: "",
    pos: 0,
    verified: false,
    payments: [],
    instructions: "",
};

export interface LoadingType {
    loading: boolean;
    error: boolean;
    loaded: boolean;
    state: number;
};

export interface TokenType {
    _id: string,
    name: string,
    price: number,
    total_supply: number,
    one_hr: any,
    one_day: any,
    thirty_days: any,
    volume_cnt: number,
    one_day_volume: number,
    img: string,
    public_id: string,
    creator_account_id: string,
    meta_data: any,
};

export interface BankType {
    bank_name: string;
    account_name: string;
    account_number: string;
};