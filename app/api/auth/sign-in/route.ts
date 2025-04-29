import { signIn } from "@/actions/auth.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await signIn(body);

  if (res) return NextResponse.json(res, { status: 404 });

  return NextResponse.json(null, { status: 200 });
}
