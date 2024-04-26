import mongoose from "mongoose";
import { z } from "zod";

interface IGenre {
  name: string;
}

const genreSchema = new mongoose.Schema<IGenre>({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});
const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre: IGenre) {
  const schema = z.object({
    name: z.string({ required_error: "Name is required" }).min(3),
  });
  return schema.safeParse(genre);
}

export { Genre, genreSchema, IGenre, validateGenre };
