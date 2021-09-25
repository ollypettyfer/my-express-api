import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { secret } from "../config/enviroment.js";

async function secureRoute(req, res, next) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer")) {
      return res
        .status(401)
        .send({ message: "you are not authroised to perform this action." });
    }

    const token = authToken.replace("Bearer ", "");

    jwt.verify(token, secret, async (err, data) => {
      if (err) {
        res.status(401).send({ message: "unathorised" });
      }
      console.log(data);
      console.log(data.userId);

      const user = await User.findById(data.userId);
      if (!user) {
        return res.status(404).send({ message: "user not found" });
      }
      // req.currentUser = user;
      next();
    });
  } catch (err) {
    return res.status(401).send({ message: "unathorised" });
  }
}
export default secureRoute;
