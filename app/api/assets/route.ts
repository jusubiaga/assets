import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();

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
    } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const asset = await prismadb.assets.create({
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
      },
    });

    return NextResponse.json(asset);
  } catch (error) {
    console.log("[ASSETS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export function DELETE() {}
