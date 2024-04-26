import mongoose, { Schema } from "mongoose";
import { z } from "zod";
import { genreSchema, IGenre } from "./Genre";

interface IMovie extends mongoose.Document {
  title: string;
  genre: IGenre;
  numberInStock: number;
  dailyRentalRate: number;
}

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});
const Movie = mongoose.model("Movie", movieSchema);

// Input validation schema for a movie
interface IMovieInput {
  title: string;
  genreId: string;
  numberInStock: number;
  dailyRentalRate: number;
}
function validateMovie(movie: IMovieInput) {
  const schema = z.object({
    title: z
      .string()
      .min(5, { message: "Title should have at least 5 characters." })
      .max(255, { message: "Title can have a maximum of 255 characters." }),
    genreId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid Genre ID format", // Custom message for invalid Genre ID
    }),
    numberInStock: z
      .number()
      .min(0, { message: "Stock cannot be negative." })
      .max(255, { message: "Stock cannot exceed 255 units." }),
    dailyRentalRate: z
      .number()
      .min(0, { message: "Rental rate must be non-negative." })
      .max(255, { message: "Rental rate must be reasonable and under 255." }),
  });
  return schema.safeParse(movie);
}

export { IMovie, Movie, movieSchema, validateMovie };
