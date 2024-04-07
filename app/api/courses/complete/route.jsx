import { NextResponse } from "next/server";
import completeCourse from "../../../../lib/db/complete-course";
export const dynamic = "force-dynamic";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { courseId } = await req.json();
      const course = await completeCourse(courseId);

      return NextResponse.json({ status: 201, data: course });
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
