import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import P2PChats from "@/models/chat";



export const fetchAgentChats = async (_id1: string, _id2: string) => { 
    const _id = (_id1 + _id2).split("").sort().join("");

    return (await P2PChats.findOne({ chat_id: _id }))?._doc || {};
};

export const sendAgentChat = async (_id1: string, _id2: string, message: any) => { 
    const _id = (_id1 + _id2).split("").sort().join("");

    return await P2PChats.findOneAndUpdate({ chat_id: _id }, { chats: { "$push": message } });
};



export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id1 = searchParams.get("_id1");
    const id2 = searchParams.get("_id2");
    if(!id1 || !id2) return NextResponse.json({ data: "Inavlid Id" }, { status: 400 });

    const res = await fetchAgentChats(id1, id2);
    return NextResponse.json({ data: res }, { status: 200 });
};


export async function POST(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id1 = searchParams.get("_id1");
    const id2 = searchParams.get("_id2");
    const message: any = await req.json();
    if(!id1 || !id2) return NextResponse.json({ data: "Inavlid Id" }, { status: 400 });
    
    const res = await sendAgentChat(id1, id2, message);
    return NextResponse.json({ data: res }, { status: 200 });
};