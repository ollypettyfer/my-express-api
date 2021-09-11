import Dog from "../models/dog.js";
import { dogsSeedData } from "./dogsSeedData.js";
import { disconntedb, truncatedb, connectdb } from "./helpers.js";

async function seed() {
  try {
    await connectdb();
    console.log("connected to database");

    await truncatedb();
    console.log("database has been dropped");

    const dogs = await Dog.create(dogsSeedData);
    console.log(`${dogs.length} added dogs to the database`);
    console.log("goodbye");
  } catch (err) {
    console.log(err, "error crreating dogs to database");
  }
  disconntedb();
}

seed();
