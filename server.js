import express from "express";
import { connectdb } from "./db/helpers.js";
import router from "./config/router.js";
import { port } from "./config/enviroment.js";

const app = express();

app.use(express.json());
app.use("/api", router);

async function startServer() {
  try {
    await connectdb();
    console.log("🦤 Mongoose is alive");
    app.listen(port, () => console.log(`🦤 Listening on Port: ${port}`));
  } catch (err) {
    console.log("🦤 Oh no something went wrong", err);
  }
}
startServer();
