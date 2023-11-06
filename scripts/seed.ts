const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const ASSETS = [
  {
    projectId: "63d627f2-15ae-40ec-8de9-385e55b3a29e",
    statusId: 0,
    headline: "headline 2",
    subline: "subline 2",
    backgraundColor: "backgraundColor 2",
    headlineColor: "headlineColor 2",
    sublineColor: "sublineColor 2",
    image: "image 2",
    logo: "logo 2",
    badged: "badged 2",
    qr: "qr 2",
  },
];

const CHANNEL = [
  { id: "1", name: "Goolge" },
  { id: "2", name: "Spotify" },
  { id: "3", name: "Tik Tok" },
  { id: "4", name: "Offline" },
  { id: "5", name: "Placid Template 5" },
];

const COUNTRY = [
  { id: "1", name: "Germany", abbreviation: "DE" },
  { id: "2", name: "Spain", abbreviation: "ES" },
  { id: "3", name: "Italy", abbreviation: "" },
  { id: "4", name: "Australia", abbreviation: "" },
];

const OUTPUTFORMAT = [
  { id: "1", name: "Image" },
  { id: "2", name: "Animation" },
  { id: "3", name: "Video Composition" },
];

async function main() {
  try {
    // await db.project.createMany({
    //   data: [
    //     { name: "Project 1" },
    //     { name: "Project 2" },
    //     { name: "Project 3" },
    //     { name: "Project 4" },
    //     { name: "Project 5" },
    //   ],
    // });

    await db.channel.createMany({
      data: CHANNEL,
    });
    await db.country.createMany({
      data: COUNTRY,
    });
    await db.outputFormat.createMany({
      data: OUTPUTFORMAT,
    });
  } catch (error) {
    console.error("Error seeding default projec:", error);
  } finally {
    console.error("done!");
    await db.$disconnect();
  }
}

main();
