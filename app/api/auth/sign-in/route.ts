import { signIn } from "@/actions/auth.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await signIn(body);

    if (result.success) return NextResponse.json(result.data, { status: 200 });

    const status = result.source === "action" ? 400 : 500;

    return NextResponse.json(result, { status });
  } catch (err) {
    console.log("[API route error] ", err);
    return NextResponse.json(null, { status: 500 });
  }
}
