import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  const assets = await fetch(
    `https://europe-west3-taxfix-development.cloudfunctions.net/baton-assets-management-app-integration/bynder/collections/${params.id}/assets?apiKey=ab801d4fba418ee8e2c6731d8593d481c0c5e858d190f3b9caec7cb2cd204e59cb7bb522856e16eafc7c20aa703644c2ccb2857a08fb2151e0cb180497549bbf&removeCache=true`
  );
  const data = await assets.json();

  return new Response(JSON.stringify(data), { status: 200 });
}
