import {User} from "./model.js";

console.log("Database synced successfully!");

await db.sync({force: true});

console.log("Seeding the database...");

const user1 = await User.create({
    username: "River",
    score: 100,
});


console.log("Database seeded successfully!");

await db.close();
