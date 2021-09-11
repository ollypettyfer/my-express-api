import express from "express";

import dogscontroller from "../controllers/dogscontroller.js";
const router = express.Router();

router
  .route("/dogs")
  .get(dogscontroller.getAllDogs)
  .post(dogscontroller.createDog);
router
  .route("/dogs/:id")
  .get(dogscontroller.getDog)
  .delete(dogscontroller.deleteDog)
  .put(dogscontroller.updateDog);

export default router;
