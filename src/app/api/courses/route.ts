import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.BASE_URI}/courses`);
  const courses = await res.json();
  return NextResponse.json({ data: courses });
}
