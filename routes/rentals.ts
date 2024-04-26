import express from "express";
import { Customer } from "../models/Customer";
import { Movie } from "../models/Movie";
import { Rental, validateRental } from "../models/Rental";
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const result = validateRental(req.body);
  if (!result.success) return res.status(400).send(result);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
	  isGold: customer.isGold
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  await rental.save();

  movie.numberInStock--;
  movie.save();

  res.send(rental);
});

export default router;
