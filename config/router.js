import express from "express";
import { getAllDogs } from "../controllers/dogscontroller.js";

const router = express.Router();

router.route("/dogs").get(getAllDogs);
export default router;
