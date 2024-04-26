import bcrypt from "bcrypt";
import express from "express";
import _ from "lodash";
import auth from "../middleware/auth";
import { IUser, User, validateUser } from "../models/User";

const router = express.Router();

router.get("/me", auth, async (req: any, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const result = validateUser(req.body);
  console.log(req.body);
  if (!result.success) return res.status(400).send(result.error);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registerred");

  user = new User<IUser>(
    _.pick(req.body, ["name", "email", "password", "isAdmin"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  if (!user.genrateAuthToken)
    return res.status(500).send("Token generation error");
  const token = user.genrateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

export default router;
