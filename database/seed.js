import { User, db } from "./model.js";

async function seed() {
  try {
    console.log("Database synced successfully!");

    await db.sync({ force: true });

    console.log("Seeding the database...");

    const user1 = await User.create({
      username: "River",
      score: 100,
    });

    console.log("Database seeded successfully!");
    console.log("Created user:", user1.toJSON());
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await db.close();
  }
}

seed();
