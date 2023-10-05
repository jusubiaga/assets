import { currentUser } from "@clerk/nextjs";

export async function GET(request: Request) {}

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !name ||
      !country ||
      !outputFormat ||
      !collection ||
      !imagesCollection ||
      !logoCollection ||
      !badgeCollection ||
      !placidTemplate ||
      !channel
    ) {
      return new NextResponse("Missing required field", { status: 400 });
    }

    const project = await prismadb.project.create({
      data: {
        userId: user.id,
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

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
