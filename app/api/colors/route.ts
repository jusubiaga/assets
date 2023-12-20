// import prismadb from "@/lib/prismadb";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  const colors = await prisma.color.findMany({});

  return new Response(JSON.stringify(colors), { status: 200 });
}
