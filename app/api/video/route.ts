import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma =PrismaClient();


export async function GET(request:NextRequest){
    try {
        const videos= await prisma.video.findMany({
            orderBy:{cretedAt:"desc"}
        })
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({error:"fetching videos"},{status:500})
        

    }
    finally{
        prisma.$disconnect()
    }

}