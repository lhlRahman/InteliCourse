import { NextResponse } from "next/server";
import getCourseById from "../../../../../lib/db/get-course-by-id";
export const dynamic = "force-dynamic";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      let courseId = req.nextUrl.pathname
        .split("/api/courses/getById/")[1]
        .split("/");

      courseId = parseInt(courseId);
      const course = await getCourseById(courseId);

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
