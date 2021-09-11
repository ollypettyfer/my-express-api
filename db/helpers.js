import mongoose from "mongoose";
import { dbUri } from "../config/enviroment.js";

export function connectdb() {
  const options = {};
  return mongoose.connect(dbUri, options);
}

export function truncatedb() {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    );

    return Promise.all(promises);
  }
}

export function disconntedb() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect();
  }
}
