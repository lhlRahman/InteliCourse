import { NextResponse } from "next/server";
import getCourses from "@/lib/db/get-all-courses";
export const dynamic = "force-dynamic";

export async function GET(req) {
  if (req.method === "GET") {
    try {
      const courses = await getCourses();

      return NextResponse.json({ status: 201, data: courses });
    } catch (error) {
      return NextResponse.json(
        { status: 500 },
        { message: `${error}: Internal server error` }
      );
    }
  } else {
    return NextResponse.json(
      { status: 405 },
      { message: "Method not allowed" }
    );
  }
}
