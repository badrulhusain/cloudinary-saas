import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    [key: string]: any
}
export async function POST(req: NextRequest) {
    try {


        const { userId }: any = auth();

        if (!userId) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        if (
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        const formadata = await req.formData();
        const file = formadata.get('file') as File || null
        const title = formadata.get("title") as string
        const descrition = formadata.get("descrition") as string
        const originalSize = formadata.get("originalSize") as string
        if (!file) {
            return NextResponse.json({ error: "no file" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const upload_stream = cloudinary.uploader.upload_stream({
                resource_type: "video",
                folder: "video-ipload",
                transformation: [
                    {
                        quality: "auto",
                        fetch_format: "mp4",
                    }
                ]
            }, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result as CloudinaryUploadResult)
            })
            upload_stream.end(buffer)
        })
        const video = await prisma.video.create({
            data: {
                title,
                description: descrition,
                publicId: result.public_id,
                originalSize,
                compressedSize: String(result.bytes),
                duration: result.duration || 0
            }
        })
        return NextResponse.json(video)
    } catch (error) {
        console.log(error, "")
        return NextResponse.json({ error: "Error uploading image" }, { status: 500 })
    }
    finally{
        await prisma.$disconnect()
    }
} 