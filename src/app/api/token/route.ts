import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose';
import dbConnect from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { OrderType } from '@/types';
import Token from '@/models/tokens';
import TokenPrices from '@/models/tokenPrices';

import { CREATE_TOKEN_REQUEST_TYPE, TOKEN_PATCH_REQUEST_TYPE } from "@/types/app";

export const filterTokens = async (_id: string, pageSize: number, filter: any) => { 

    if(_id) {
        return await Token.find({ _id: { $gt: _id }, ...filter }).limit(pageSize).exec();
    } else {
        return await Token.find({ ...filter }).limit(pageSize).exec();
    }
};

const saveNewToken = async (tokenName: string, data: OrderType, supply: number, meta_data: any, img: string, time: number) => {
    // there's imageToBase64 function in /utils/helpers.ts file
    const { secure_url, public_id } = await cloudinary.uploader.upload(img, {
        overwrite: true,
        width: 380, height: 300, crop: "fill",
        folder: "/Openfield/tokens", // tokens & users are the sub-folders under Openfield folder in my cloudinary
    });

    const firstObj = {
        time,
        change: 0.0,
        price: data.price,
    };
    const newToken = new Token({
        name: tokenName,
        price: data.price,
        total_supply: supply,
        one_hr: firstObj,
        one_day: firstObj,
        thirty_days: firstObj,
        volume_cnt: 0,
        one_day_volume: 0,
        img: secure_url,
        public_id,
        creator_account_id: data.account_id,
        meta_data,
    });
    await newToken.save();
};

export const createToken = async (tokenName: string, data: OrderType, supply: number, meta_data: any, img: string) => {
    const time = Date.now();
    const Schema = mongoose.Schema;
    const orderSchema = new Schema(
        { 
            price: Number, qty: Number, 
            price_decimal: Number, 
            account_id: String,
            circulation_order: {
                type: Boolean,
                default: false,
            } 
        }
    );
    orderSchema.set("timestamps", true); // to add createdAt

    // Defining User model
    const BuyOrder = mongoose.model(`${tokenName}_BUY`, orderSchema);
    const SellOrder = mongoose.model(`${tokenName}_SELL`, orderSchema);

    async function initialSellOrder() {
        await SellOrder.createCollection();

        const sellOrder = new SellOrder({
            ...data,
            circulation_order: true,
        });

        await sellOrder.save(); 
    }; 

    async function tokenPrices() {
        const t = new TokenPrices({
            name: tokenName,
            prices_data: {
                price: data.price,
                time_stamp: time,
            },
        });
        
        await t.save();
    };

    await Promise.all([
        BuyOrder.createCollection(),
        initialSellOrder(),
        saveNewToken(tokenName, data, supply, meta_data, img, time),
        tokenPrices(),
    ]);
};

export const burnToken = async (tokenName: string, burnAmount: number) => {
    const collection = mongoose.models[`${tokenName}_SELL`];
    // const circulationOrder = await collection.findOne({ circulation_order: true });
    // const _id = circulationOrder._doc._id.toString();
    // const qty = circulationOrder._doc.qty;
    // const newQty = qty - burnAmount;
    // await collection.findByIdAndUpdate(_id, { qty: newQty });

    await collection.findOneAndUpdate({ circulation_order: true }, { $inc: { qty: -burnAmount } });

    await Token.findOneAndUpdate({ name: tokenName }, { $inc: { total_supply: -burnAmount } });
};

export const mintToken = async (tokenName: string, mintAmount: number) => {
    const collection = mongoose.models[`${tokenName}_SELL`];
    // const circulationOrder = await collection.findOne({ circulation_order: true });
    // const _id = circulationOrder._doc._id.toString();
    // const qty = circulationOrder._doc.qty;
    // const newQty = qty + mintAmount;
    // await collection.findByIdAndUpdate(_id, { qty: newQty });

    await collection.findOneAndUpdate({ circulation_order: true }, { $inc: { qty: mintAmount } });

    await Token.findOneAndUpdate({ name: tokenName }, { $inc: { total_supply: mintAmount } });
};



// export async function GET(req: NextRequest) {
//     await dbConnect();
// };


export async function PUT(req: NextRequest) {
    await dbConnect();
    const data: CREATE_TOKEN_REQUEST_TYPE = await req.json();

    await createToken(data.tokenName, data.data, data.supply, data.meta_data, data.img);

    return NextResponse.json({ data: "Token Created Successfully" }, { status: 200 });

    // const res = await cloudinary.uploader.upload(data.img, {
    //     overwrite: true,
    //     width: 300, height: 210, crop: "fill",
    //     folder: "/Gab/messages",
    // });
    // const d = { ...data, img: res.secure_url, public_id: res.public_id };
    // const newSurvey = new Survey({ ...d });
    // await newSurvey.save();
    // return NextResponse.json({ data: newSurvey }, { status: 200 });
};


export async function POST(req: NextRequest) {
    await dbConnect();
    const data: any = await req.json();

    const res = await filterTokens(data._id, data.pageSize, data.filter);

    return NextResponse.json({ data: res }, { status: 200 });
};


export async function PATCH(req: NextRequest) {
    await dbConnect();
    const data: TOKEN_PATCH_REQUEST_TYPE = await req.json();

    if(data.param === 'BURN') {
        await burnToken(data.tokenName, data.amount);
    } else if(data.param === 'MINT') {
        await mintToken(data.tokenName, data.amount); 
    }


    // const _id = data._id;
    // const res: any = await Survey.findById(_id);
    // if(!res) return NextResponse.json({ data: "Survey not found" }, { status: 404 });

    // const survey = res._doc;
    // data.answers.forEach((answer, answer_idx) => {
    //     // answer is the option selected, idx is the question index;
    //     survey.responses[answer_idx][answer] += 1; 
    // });
    // survey.users.push(data.userId);
    // const newSurvey = await Survey.findByIdAndUpdate(_id, {...survey}, { new: true });
    // return NextResponse.json({ data: newSurvey }, { status: 200 });
};