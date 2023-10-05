import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    return new Response(project, { status: 404 });
  }

  return new Response(JSON.stringify(project));
}
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const user = await currentUser();
    const {
      name,
      description,
      country,
      outputFormat,
      collection,
      imagesCollection,
      logoCollection,
      badgeCollection,
      placidTemplate,
      channel,
    } = body;

    if (!params.id) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !name ||
      !description ||
      !country ||
      !outputFormat ||
      !collection ||
      !imagesCollection ||
      !logoCollection ||
      !badgeCollection ||
      !placidTemplate ||
      !channel
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        name,
        description,
        country,
        outputFormat,
        collection,
        imagesCollection,
        logoCollection,
        badgeCollection,
        placidTemplate,
        channel,
      },
    });

    return new Response(JSON.stringify(project));
  } catch (error) {
    return new Response("", { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify(project));
  } catch (error) {
    return new Response("", { status: 404 });
  }
}
