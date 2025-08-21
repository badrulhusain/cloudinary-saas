import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any
}
export async function POST(req:NextRequest){
    const {userId}:any =auth();
    
    if(!userId){
        return NextResponse.json({error:"unauthorized"},{status:401})
    }
    try {
        const formadata= await req.formData() ;
        const file = formadata.get('file') as File || null 
        
    } catch (error) {
        
    }
}