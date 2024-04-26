import mongoose from "mongoose";
import { z } from "zod";

interface ICustomer {
  isGold: boolean;
  name: string;
  phone: String;
}

const customerSchema = new mongoose.Schema<ICustomer>({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  phone: { type: String, required: true, minlength: 5, maxlength: 50 },
});
const Customer = mongoose.model("Course", customerSchema);

function validateCustomer(customer: ICustomer) {
  const schema = z.object({
    isGold: z.boolean(),
    name: z.string().min(5).max(50),
    phone: z.string().min(5).max(50),
  });
  return schema.safeParse(customer);
}

export { Customer, ICustomer, validateCustomer };
