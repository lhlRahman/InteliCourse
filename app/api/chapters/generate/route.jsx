import { NextResponse } from "next/server";
import getChapterInfo from "@/lib/db/get-chapter-info";
export const dynamic = "force-dynamic";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { chapterId } = await req.json();
      const res = await getChapterInfo(chapterId);

      return NextResponse.json({ status: 201, data: res });
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
