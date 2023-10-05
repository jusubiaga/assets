import prisma from "@/lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.assets.findMany({
      where: { projectId: params.id },
    });
    return new Response(JSON.stringify(project));
  } catch (error) {
    console.log("ERROR: ", error)
  }
}
