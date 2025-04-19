import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get("meetingId");

  const meeting = await prisma.meeting.findUnique({
    where: {
      id: meetingId!,
    },
    include: {
      result: {
        include: {
          actionItems: true,
        },
      },
      uploader: true,
    },
  });

  return NextResponse.json(meeting, { status: 200 });
}
