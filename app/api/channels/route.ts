// import prismadb from "@/lib/prismadb";
import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";

// import { useSearchParams } from "next/navigation";
// import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const accessToken = request.headers.get("authorization");
  // if (!accessToken || !verifyJwt(accessToken)) {
  //   return new Response(
  //     JSON.stringify({
  //       error: "unauthorized",
  //     }),
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  // const userId = await currentUser();

  const channels = await prisma.channel.findMany({});

  return new Response(JSON.stringify(channels), { status: 200 });
}
