import z from "zod";

export const addSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  price: z.preprocess(
    (val) => parseFloat(val), // نحول القيمة المدخلة إلى رقم عشري
    z.number().positive({ message: "Price must be a valid number greater than 0" }) // التحقق من أن القيمة رقمية وموجبة
  ),
  description: z.string().min(15, { message: "Description must be at least 15 characters long" }),
  rate: z.preprocess(
    (val) => parseFloat(val), // تحويل القيمة إلى رقم
    z.number().min(0).max(5).refine((val) => Math.round(val * 10) % 1 === 0, { message: "Rate must be a multiple of 0.1" })
  ),
  count: z.preprocess(
    (val) => parseFloat(val), // تحويل القيمة إلى رقم
    z.number().min(0.1, { message: "Count must be a valid number greater than or equal to 0.1" })
  ),
});