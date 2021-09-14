import express from "express";
import commentsController from "../controllers/commentsController.js";

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

router.route("/dogs/:id/comments").post(commentsController.createComment);

router
  .route("/dogs/:id/comments/:commentId")
  .delete(commentsController.deleteComment)
  .put(commentsController.updateComment);

export default router;
