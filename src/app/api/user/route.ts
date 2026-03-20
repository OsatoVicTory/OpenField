import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import User from "@/models/user";
import bcrypt from "bcrypt"; 


export const createUser = async (data: any, img: string) => {
    
    const user = await User.findOne({ email: data.email });
    if(user) return new Error("Email has been used");

    const hashed_password = await bcrypt.hash(data.password, 10);

    const { secure_url, public_id } = await cloudinary.uploader.upload(img, {
        overwrite: true,
        folder: "/Openfield/users", // tokens & users are the sub-folders under Openfield folder in my cloudinary
    });

    const newUser = new User({ userName: data.name, password: hashed_password, email: data.email, img: secure_url, public_id });
    await newUser.save();
};


export const logUserIn = async (data: any) => {
 
    const user = await User.findOne({ email: data.email });
    if(!user) return new Error("No user found");

    const isValid = await bcrypt.compare(data.password, user._doc.password);
    if(!isValid) return new Error("Incorrect password");
    
    return user._doc;
};

export const verifyUser = async (_id: string, idImg: string) => { // upload id e.g NIN

    const { secure_url, public_id } = await cloudinary.uploader.upload(idImg, {
        overwrite: true,
        folder: "/Openfield/ids",
    });

    const newUser = await User.findByIdAndUpdate(_id, { ID_img: secure_url, ID_public_id: public_id, id_verified: true }, { new: true });
    return newUser._doc;
};


export const updateUser = async (_id: string, data: any) => {
    const newUser = await User.findByIdAndUpdate(_id, { ...data }, { new: true });
    return newUser._doc;
};



export async function POST(req: NextRequest) {
    await dbConnect();
    const data: any = await req.json();
    if(data.param === "LOGIN") {
        await logUserIn(data.data);
    } else if(data.param === "VERIFY") {
        await verifyUser(data._id, data.idImg);
    }
};


export async function PUT(req: NextRequest) {
    await dbConnect();
    const data: any = await req.json();
    await createUser(data.data, data.img);
};


export async function PATCH(req: NextRequest) {
    await dbConnect();
    const data: any = await req.json();
    await updateUser(data._id, data.data);
};