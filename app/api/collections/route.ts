// import prismadb from "@/lib/prismadb";
import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import axios from "axios";

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

  // const userId = await currentUser();
  //   const collections = await axios.get(
  //     "https://europe-west3-taxfix-development.cloudfunctions.net/baton-assets-management-app-integration/bynder/collections",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       params: {
  //         apiKey:
  //           "ab801d4fba418ee8e2c6731d8593d481c0c5e858d190f3b9caec7cb2cd204e59cb7bb522856e16eafc7c20aa703644c2ccb2857a08fb2151e0cb180497549bbf",
  //       },
  //     }
  //   );

  const collections = await fetch(
    "https://europe-west3-taxfix-development.cloudfunctions.net/baton-assets-management-app-integration/bynder/collections?apiKey=ab801d4fba418ee8e2c6731d8593d481c0c5e858d190f3b9caec7cb2cd204e59cb7bb522856e16eafc7c20aa703644c2ccb2857a08fb2151e0cb180497549bbf"
    // {
    //   mode: "cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // }
  );
  const data = await collections.json();
  //   console.log(data);

  return new Response(JSON.stringify(data), { status: 200 });
}
