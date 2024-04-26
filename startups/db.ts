import mongoose from "mongoose";

export default function () {
  mongoose
    .connect("mongodb://localhost:27017/playground")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));
}
