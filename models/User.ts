import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { z } from "zod";

// interface
type IUser = {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  genrateAuthToken?: () => string;
};

// schema
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  isAdmin: Boolean,
});

// generate token
userSchema.methods.genrateAuthToken = function () {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, "jwtSecret");
};

// model
const User = mongoose.model<IUser>("User", userSchema);

// validation
function validateUser(user: IUser) {
  const schema = z.object({
    name: z.string().min(5).max(50),
    email: z.string().min(5).max(255).email(),
    password: z.string().min(5).max(255),
    isAdmin: z.boolean().optional(),
  });
  return schema.safeParse(user);
}

export { IUser, User, userSchema, validateUser };
