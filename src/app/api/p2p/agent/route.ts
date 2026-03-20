import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SellerAgent from "@/models/p2pSellers";
import BuyerAgent from "@/models/p2pBuyers";


export const fetchAgents = async (_id: string, pageSize: number, seller = true) => { 

    let Agent = SellerAgent;
    if(seller) Agent = BuyerAgent;

    if(_id) {
        return await Agent.find({ _id: { $gt: _id }}).limit(pageSize).exec();
    } else {
        return await Agent.find().limit(pageSize).exec();
    }
};

export const filterAgents = async (_id: string, pageSize: number, filter: any, seller = true) => { 

    let Agent = SellerAgent;
    if(seller) Agent = BuyerAgent;

    if(_id) {
        return await Agent.find({ _id: { $gt: _id }, ...filter }).limit(pageSize).exec();
    } else {
        return await Agent.find({ ...filter }).limit(pageSize).exec();
    }
};

export const createAgent = async (data: any, seller = true) => {
    let Agent = SellerAgent;
    if(seller) Agent = BuyerAgent;
    const agent = await Agent.findOne({ name: data.name });
    if(agent) return new Error("Email has been used");

    const newAgent = new Agent({ ...data });
    await newAgent.save();
};

export const verifyAgent = async (_id: string, data: string, seller = true) => { // upload a pic (in data) of document for verification

    let Agent = SellerAgent;
    if(seller) Agent = BuyerAgent;

    const newAgent = await Agent.findByIdAndUpdate(_id, { verified: true }, { new: true });
    return newAgent._doc;
};

export const updateAgent = async (_id: string, data: any, seller = true) => {

    let Agent = SellerAgent;
    if(seller) Agent = BuyerAgent;

    const newAgent = await Agent.findByIdAndUpdate(_id, { ...data }, { new: true });
    return newAgent._doc;
};


export async function PATCH(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("_id");
    const req_type = searchParams.get("reqType");
    const data: any = await req.json();

    if(!agentId) return NextResponse.json({ data: "Inavlid Id" }, { status: 400 });

    let res;

    if(req_type === "VERIFY") {
        res = await verifyAgent(agentId, data.data, data.seller);
    } else {
        res = await updateAgent(agentId, data.data, data.seller);
    }

    return NextResponse.json({ data: res }, { status: 200 });
};

export async function POST(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("_id");
    const data: any = await req.json();

    let res;

    if(data.filter) {
        res = await filterAgents(agentId||"", data.pageSize, data.filters, data.seller);
    } else {
        res = await fetchAgents(agentId||"", data.pageSize, data.seller);
    }

    return NextResponse.json({ data: res }, { status: 200 });
};

export async function PUT(req: NextRequest) {
    await dbConnect();
    const data: any = await req.json();
    await createAgent(data.data, data.seller);
};