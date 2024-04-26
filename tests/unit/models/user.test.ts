import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../../../models/User";

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.genrateAuthToken();
    const decoded = jwt.verify(token, "jwtSecret");
    expect(decoded).toMatchObject(payload);
  });
});
