"use server";

import cloudinary from "@/lib/cloudinary";

// resource_type = 'image' | "raw"
const cld = cloudinary;

export const uploadToCloudinary = async (fileStr: string, folder = "/Openfield/users", resource_type = "image") => {
    return await cld.uploader.upload(fileStr, {
        overwrite: true,
        resource_type: resource_type as any,
        folder, 
    });
};

export const deleteFileCloudinary = async (public_id: string, resource_type = "image") => {
    return await cld.api.delete_resources(
        [public_id], { type: 'upload', resource_type: resource_type }
    )
};