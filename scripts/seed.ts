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
  { name: "Goolge" },
  { name: "Spotify" },
  { name: "Tik Tok" },
  { name: "Offline" },
  { name: "Placid Template 5" },
];

const COUNTRY = [
  { name: "Germany", abbreviation: "DE" },
  { name: "Spain", abbreviation: "ES" },
  { name: "Italy", abbreviation: "" },
  { name: "Australia", abbreviation: "" },
];

const ADDONS = [
  { name: "Seal" },
  { name: "Promotion" },
  { name: "Countdown" },
  { name: "Emoticon" },
  { name: "Stopper" },
  { name: "Convinience" },
];

const LANGUAGES = [
  { name: "German" },
  { name: "Spanish" },
  { name: "Italian" },
  { name: "French" },
];

const CREATIVE_IMAGE_PERSON = [
  { name: "Person" },
  { name: "Group" },
  { name: "Environment Type" },
];

const CREATIVE_IMAGE_SCREEN = [{ name: "Application" }, { name: "Desktop" }];

const MESSAGING_BENEFITS = [
  { name: "Benefits - Price" },
  { name: "Features - English" },
];

const TONALITY = [
  { name: "Facts" },
  { name: "Emotional" },
  { name: "Educational" },
  { name: "Funny" },
];

const ADDRESSED_GROUP = [
  { name: "Married Couples" },
  { name: "Pensioners" },
  { name: "Expats" },
  { name: "Parents" },
  { name: "Non-filers" },
  { name: "Students" },
  { name: "1st Time Filers" },
  { name: "Generic" },
];

const CREATIVE_IMAGE_TEXT = [{ name: "Headline" }, { name: "Text Block" }];

const OUTPUTFORMAT = [
  { name: "Image" },
  { name: "Animation" },
  { name: "Video Composition" },
];

const COLORS = [
  { brand: "Lime green", hex: "#FFFFFF" },
  { brand: "Lime green", hex: "#000000" },
  { brand: "Lime green", hex: "#252525" },
  { brand: "Lime green", hex: "#32C850" },
  { brand: "Lime green", hex: "#006246" },
  { brand: "Pine green", hex: "#FFFFFF" },
  { brand: "Pine green", hex: "#000000" },
  { brand: "Pine green", hex: "#C3C4FE" },
  { brand: "Pine green", hex: "#F5EDA3" },
  { brand: "Pine green", hex: "#A1EFA9" },
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
    await db.color.createMany({
      data: COLORS,
    });
    await db.addon.createMany({
      data: ADDONS,
    });
    await db.language.createMany({
      data: LANGUAGES,
    });
    await db.creativeImagePerson.createMany({
      data: CREATIVE_IMAGE_PERSON,
    });
    await db.creativeImageScreen.createMany({
      data: CREATIVE_IMAGE_SCREEN,
    });
    await db.messagingBenefits.createMany({
      data: MESSAGING_BENEFITS,
    });
    await db.tonality.createMany({
      data: TONALITY,
    });
    await db.addressedGroup.createMany({
      data: ADDRESSED_GROUP,
    });
    await db.creativeImageText.createMany({
      data: CREATIVE_IMAGE_TEXT,
    });
  } catch (error) {
    console.error("Error seeding default projec:", error);
  } finally {
    console.error("done!");
    await db.$disconnect();
  }
}

main();
