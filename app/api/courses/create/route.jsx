import { NextResponse } from "next/server";
import generateCourse from "../../../../lib/db/generate-course";
export const dynamic = "force-dynamic";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { userId, title, units } = await req.json();
      const courseId = await generateCourse(userId, title, units);

      return NextResponse.json({ status: 201, data: courseId });
    } catch (error) {
      return NextResponse.json({
        status: 500,
        message: `${error}: Internal server error`,
      });
    }
  } else {
    return NextResponse.json({ status: 405, message: "Method not allowed" });
  }
}
