import bcrypt from "bcrypt";
import express from "express";
import z from "zod";
import { User } from "../models/User";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = validate(req.body);
    if (!result.success) return res.status(400).send(result.error);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword)
      return res.status(400).send("Invalid email or password");

    if (!user.genrateAuthToken)
      return res.status(500).send("Token generation error");
    const token = user.genrateAuthToken();

    res.send(token);
  } catch (error) {
    console.error("Error in user authentication:", error);
    res.status(500).send("Internal Server Error");
  }
});

function validate(req: any) {
  const schema = z.object({
    email: z.string().min(5).max(255).email(),
    password: z.string().min(5).max(255),
  });
  return schema.safeParse(req);
}

export default router;
