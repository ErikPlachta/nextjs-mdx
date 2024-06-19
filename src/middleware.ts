// middleware.tsx
import { NextRequest, NextResponse } from "next/server";
import Context from "@/libs/context";

export default function middleware(request: NextRequest) {
  // 1. Get incoming request
  let requestHeaders = new Headers(request.headers);

  // 2. Extract the URL from the request
  let url = new URL(request.url);

  // 3. Update header with url making the request
  requestHeaders.set("x-url", request.url);

  // 4. Create or fetch context
  let context = Context();
  let contextString = JSON.stringify(context);

  // 5. Attach context to headers
  requestHeaders.set("x-context", contextString);
  requestHeaders.set("context", contextString);

  // 6. Match SSR requests as well as RSC client-side navigation requests
  if (
    url.pathname.includes("/middleware/global") ||
    url.searchParams.get("path")?.match(/middleware\/global/)
  ) {
    // console.log("running global middleware function!");
    // TODO: Onboard this to custom context lib to feed to pages.
  } else {
    // console.log("running non-global middleware function!");
    // console.log("context: ", context);
  }

  // Produce a response with the new headers
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
