import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export { auth as middleware } from "@/auth";

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
