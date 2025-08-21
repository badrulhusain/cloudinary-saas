import { NextRequest, NextResponse } from "next/server"
// import { } from '@prisma/client'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
export async function GET(request: NextRequest){
    try {
        const videos = await prisma.video.findMany({
            orderBy: {createdAt: "desc"}
        })
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({error: "Error fetching videos"}, {status: 500})
    } finally {
        await prisma.$disconnect()
    }
}