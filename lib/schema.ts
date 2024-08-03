import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(5, { message: "Product name must be at least 5 characters long" }),
  description: z.string().min(10, {
    message: "Product description must be at least 10 characters long",
  }),
  size: z.enum(["xs", "s", "m", "l", "xl", "xxl"], {
    errorMap: () => ({
      message: "Invalid size. Must be one of: xs, s, m, l, xl, xxl",
    }),
  }),
  gender: z.enum(["men", "woman", "unisex"], {
    errorMap: () => ({
      message: "Invalid gender. Must be one of: men, woman, unisex",
    }),
  }),
  colors: z.array(z.string()).min(1, {
    message: "At least one color is required. Please select a color",
  }),
  category: z
    .array(z.string())
    .min(1, { message: "Category must be at least 1 character long" }),
  subcategory: z.array(z.string()).min(1, {
    message:
      "At least one subcategory is required. Please select a subcategory",
  }),
  discountPrice: z
    .number()
    .min(1, { message: "Discount Price must be greater than 0" }),
  price: z.number().min(1, { message: "Price must be greater than 0" }),
  quantity: z.number().min(1, { message: "Quantity must be greater than 0" }),
  processingTime: z.string().min(1, { message: "Processing Time is required" }),
});
