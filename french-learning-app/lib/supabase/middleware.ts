import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Simplified middleware - just pass through for now
  return NextResponse.next({
    request,
  })
}
