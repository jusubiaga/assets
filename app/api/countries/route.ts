// import prismadb from "@/lib/prismadb";
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

  const countries = await prisma.country.findMany({});

  return new Response(JSON.stringify(countries), { status: 200 });
}
