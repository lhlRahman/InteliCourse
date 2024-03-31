import { NextResponse } from "next/server";
import GetUserByClerkId from "../../../../../lib/db/get-user-by-clerkId";
export const dynamic = "force-dynamic";

export async function GET(req) {
  if (req.method === "GET") {
    try {
      let userId = req.nextUrl.pathname
        .split("/api/user/getclerk/")[0]
        .split("/");
      userId = userId[userId.length - 1];
      const user = await GetUserByClerkId(userId);
      return NextResponse.json({ status: 201, data: user });
    } catch (error) {
      return NextResponse.json(
        { status: 500 },
        { message: `${error}: Internal server error` }
      );
    }
  }
}
