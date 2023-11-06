import prismadb from "@/lib/prismadb";
import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

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

  const userId = await currentUser();

  const projects = await prisma.project.findMany({
    include: {
      outputFormatFK: true,
      channelFK: true,
      countryFK: true,
    },
    where: { userId: userId?.id },
  });

  return new Response(JSON.stringify(projects), { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const {
      name,
      description,
      countryId,
      outputFormatId,
      collection,
      imagesCollection,
      logoCollection,
      badgeCollection,
      placidTemplate,
      channelId,
    } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !name ||
      !countryId ||
      !outputFormatId ||
      !collection ||
      !imagesCollection ||
      !logoCollection ||
      !badgeCollection ||
      !placidTemplate ||
      !channelId
    ) {
      return new NextResponse("Missing required field", { status: 400 });
    }

    const project = await prismadb.project.create({
      data: {
        userId: user.id,
        name,
        description,
        countryId,
        outputFormatId,
        collection,
        imagesCollection,
        logoCollection,
        badgeCollection,
        placidTemplate,
        channelId,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);

  // try {
  //   const result = await prismadb.project.delete({
  //     where: {
  //       id: req.,
  //     },
  //   })
  // } catch (error) {

  // }
}
