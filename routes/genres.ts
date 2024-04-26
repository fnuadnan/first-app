import express from "express";
import admin from "../middleware/admin";
import auth from "../middleware/auth";
import { Genre, validateGenre } from "../models/Genre";
const router = express.Router();

// interface IValidationResult {
//   success: boolean;
//   error?: ZodError;
// }

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  } catch (error) {
    res.status(500).send('Something failed');
  }
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const result = validateGenre(req.body);
  if (!result.success)
    return res.status(400).send(result);

  const newGenre = new Genre({ name: req.body.name });

  try {
    await newGenre.save();
    res.send(newGenre);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send("Something failed");
  }
});

router.put("/:id", async (req, res) => {
  const result = validateGenre(req.body);
  if (!result.success)
    return res.status(404).send(result);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(400).send("The genre with the given ID was not found");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req: any, res: any) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(400).send("The genre with the given ID was not found");

  res.send(genre);
});

export default router;

// router.put("/:id", (req, res) => {
// look the course
// if not exist return 404
// validate
// if invalid return 4040
// });

// router.delete("/:id", () => {
// look up the course
// if not exist return 404
// delete
// return the same course

// app.get("/items/:itemId", (req, res) => {
//   const { itemId } = req.params; // Access path parameter
//   const { keyword, sort } = req.query; // Access query parameters, if they exist

//   // Check if query parameters are present
//   if (keyword || sort) {
//     res.send(
//       `You requested item with ID: ${itemId}, filtered by keyword: ${keyword} and sorted: ${sort}`
//     );
//   } else {
//     res.send(`You requested item with ID: ${itemId}`);
//   }
// });
