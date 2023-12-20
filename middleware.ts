import { authMiddleware } from "@clerk/nextjs";
import { channel } from "diagnostics_channel";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  // publicRoutes: ["/api/webhook"],
  publicRoutes: [
    "/api/projects",
    "/api/projects/(.*)",
    "/api/channels",
    "/api/output-formats",
    "/api/countries",
    "/api/assets",
    "/api/assets/(.*)",
    "/api/collections",
    "/api/collections/(.*)",
    "/api/colors",
  ],
});

export const config = {
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ["/((?!.*\\..*|_next).*)", "/"],
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
