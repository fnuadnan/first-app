import express from "express";
import { Customer, validateCustomer } from "../models/Customer";
const router = express.Router();

// interface IValidationResult {
//   success: boolean;
//   error?: ZodError;
// }

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");
  res.send(customer);
});

router.post("/", async (req, res) => {
  const result = validateCustomer(req.body);
  if (!result.success)
    return res.status(400).send(result.error?.issues[0].message);

  const newCustomer = new Customer({ name: req.body.name });

  try {
    await newCustomer.save();
    res.send(newCustomer);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send("Something failed");
  }
});

router.put("/:id", async (req, res) => {
  const result = validateCustomer(req.body);
  if (!result.success)
    return res.status(404).send(result.error?.issues[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!customer)
    return res.status(400).send("The genre with the given ID was not found");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res.status(400).send("The customer with the given ID was not found");

  res.send(customer);
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
