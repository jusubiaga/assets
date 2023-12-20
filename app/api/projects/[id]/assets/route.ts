import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";

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
    console.log("ERROR: ", error);
  }
}

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

    if (!user || !user.id || !user.firstName) {
      return new Response("Unauthorized", { status: 401 });
    }

    const asset = await prisma.assets.create({
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

    return Response.json(asset);
  } catch (error) {
    console.log("[ASSETS_POST]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
