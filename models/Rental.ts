import mongoose from "mongoose";
import { z } from "zod";
import { ICustomer } from "./Customer";
import { IMovie } from "./Movie";

interface IRental {
  customer: Pick<ICustomer, "name" | "phone" | "isGold">; // Picking only 'name' and 'phone' from ICustomer
  movie: Pick<IMovie, "title" | "dailyRentalRate">; // Picking only 'title' from IMovie
  dateOut: Date;
  dateReturned?: Date;
  rentalFee: number;
}

const Rental = new mongoose.Schema<IRental>({
  customer: {
    type: new mongoose.Schema({
      isGold: { type: Boolean, default: false },
      name: { type: String, required: true, minlength: 5, maxlength: 50 },
      phone: { type: String, required: true, minlength: 5, maxlength: 50 },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

// Input validation schema for a new rental
interface IRentalInput {
  customerId: string;
  movieId: string;
}
function validateRental(rental: IRentalInput) {
  const schema = z.object({
    customerId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid customer ID format", // Custom message for invalid customer ID
    }),
    movieId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid movie ID format", // Custom message for invalid movie ID
    }),
  });
  return schema.safeParse(rental);
}

export { Rental, validateRental };
