import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uploadId = searchParams.get("meetingId");

  const upload = await prisma.upload.findUnique({
    where: {
      id: uploadId!,
    },
    include: {
      result: {
        include: {
          actionItems: {
            include: {
              assignee: true,
            },
          },
        },
      },
      uploader: true,
    },
  });

  return NextResponse.json(upload, { status: 200 });
}
