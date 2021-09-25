import express from "express";
import commentsController from "../controllers/commentsController.js";
import dogscontroller from "../controllers/dogscontroller.js";
import colourController from "../controllers/colourController.js";
import userController from "../controllers/userController.js";
import secureRoute from "../middleWare/secureRoute.js";

const router = express.Router();

router
  .route("/dogs")
  .get(dogscontroller.getAllDogs)
  .post(secureRoute, dogscontroller.createDog);
router
  .route("/dogs/:id")
  .get(dogscontroller.getDog)
  .delete(secureRoute, dogscontroller.deleteDog)
  .put(secureRoute, dogscontroller.updateDog);

router
  .route("/dogs/:id/comments")
  .post(secureRoute, commentsController.createComment);

router
  .route("/dogs/:id/comments/:commentId")
  .delete(secureRoute, commentsController.deleteComment)
  .put(secureRoute, commentsController.updateComment);

router
  .route("/colours")
  .get(colourController.getAllColours)
  .post(secureRoute, colourController.createColour);

router
  .route("/colours/:id")
  .get(colourController.getColour)
  .delete(secureRoute, colourController.deleteColour)
  .post(secureRoute, colourController.updateColour);

router.route("/colours/:id/dogs").get(colourController.getAllDogsForColours);

router.route("/register").post(userController.registerUser);

router.route("/login").post(userController.loginUser);
export default router;
