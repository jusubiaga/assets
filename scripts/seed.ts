const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.project.createMany({
      data: [
        { name: "Project 1" },
        { name: "Project 2" },
        { name: "Project 3" },
        { name: "Project 4" },
        { name: "Project 5" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default projec:", error);
  } finally {
    console.error("done!");
    await db.$disconnect();
  }
}

main();
