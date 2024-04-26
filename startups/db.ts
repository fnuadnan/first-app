import mongoose from "mongoose";

export default function () {
  mongoose
    .connect(process.env.DB_TEST)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));
}
