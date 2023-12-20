import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import exp from "constants";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.assets.findUnique({
      where: { id: params.id },
    });
    return new Response(JSON.stringify(project));
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.assets.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify(project));
  } catch (error) {
    return new Response("", { status: 404 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const user = await currentUser();

    console.log(body);
    const {
      projectId,
      statusId,
      headline,
      subline,
      backgraundColor,
      headlineColor,
      sublineColor,
      image,
      logo,
      badged,
      qr,
      country,
      addOn,
      language,
      creativeImagePerson,
      creativeImageScreen,
      messagingBenefits,
      tonality,
      addressedGroup,
      creativeImageText,
      uniqueText,
    } = body;

    if (!params.id) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !projectId ||
      !headline ||
      !subline ||
      !backgraundColor ||
      !headlineColor ||
      !sublineColor ||
      !image ||
      !logo ||
      !badged ||
      !qr
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const project = await prisma.assets.update({
      where: { id: params.id },
      data: {
        projectId,
        statusId,
        headline,
        subline,
        backgraundColor,
        headlineColor,
        sublineColor,
        image,
        logo,
        badged,
        qr,
        country,
        addOn,
        language,
        creativeImagePerson,
        creativeImageScreen,
        messagingBenefits,
        tonality,
        addressedGroup,
        creativeImageText,
        uniqueText,
      },
    });

    return new Response(JSON.stringify(project));
  } catch (error) {
    return new Response("", { status: 404 });
  }
}
