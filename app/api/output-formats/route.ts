import prisma from "@/lib/prismadb";

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

  const outputFormats = await prisma.outputFormat.findMany({});

  return new Response(JSON.stringify(outputFormats), { status: 200 });
}
